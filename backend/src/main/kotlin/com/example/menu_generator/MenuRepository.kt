package com.example.menu_generator

import io.github.cdimascio.dotenv.dotenv
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Repository
import org.springframework.web.client.RestTemplate
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Component
import java.sql.ResultSet
import java.sql.Statement
import java.util.*
import java.util.stream.Collectors


data class ClaudeMessage(
    val role: String,
    val content: String
)

data class ClaudeRequest(
    val model: String,
    val max_tokens: Int,
    val messages: Array<ClaudeMessage>
)

data class ClaudeContent(
    val type: String,
    val text: String
)

data class ClaudeResponse(
    val content: Array<ClaudeContent>,
    val stop_reason: String
)

@Configuration
class RestConfig {
    @Bean
    fun restTemplate(builder: RestTemplateBuilder): RestTemplate {
        return builder.build()
    }
}

@Component
class RecipeRowMapper: RowMapper<Recipe> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Recipe {
        return Recipe(
            recipe_id = rs.getInt(1),
            recipeName = rs.getString(2),
            description = rs.getString(3),
            ingredients = Arrays.asList(
                rs.getArray(4))
                .flatMap { e -> e.toString()
                    .drop(1)
                    .dropLast(1)
                    .split(",")
                }
                .toTypedArray(),
        )
    }
}

@Repository
class MenuRepository(
    val restTemplate: RestTemplate,
    val jdbcTemplate: JdbcTemplate,
    val recipeRowMapper: RecipeRowMapper
) {

    fun getRecommendMenu(content: String): Array<Recipe> {

        val dotenv = dotenv()
        val apiKey = dotenv["CLAUDE_API_KEY"]

        val headers = HttpHeaders()
        headers.set("x-api-key",apiKey)
        headers.set("anthropic-version", "2023-06-01")
        headers.set("content-type", "application/json")

        val httpEntity = HttpEntity(ClaudeRequest(
            "claude-3-haiku-20240307",
            1024,
            arrayOf( ClaudeMessage("user", content))
        ), headers)

        val response = restTemplate.postForObject("https://api.anthropic.com/v1/messages", httpEntity, ClaudeResponse::class.java)
        val json = response!!.content[0].text
        val mapper = jacksonObjectMapper()
        val recipes = mapper.readValue<Array<Recipe>>(json)

        return recipes
    }

    fun saveFavoriteRecipe(recipe: Recipe): Int {
        val keyHolder = GeneratedKeyHolder()
        jdbcTemplate.update({ connection ->
            val ps = connection.prepareStatement("INSERT INTO saved_recipe (name, description, ingredients) VALUES (?, ?, ?)", Statement.RETURN_GENERATED_KEYS)
            ps.setObject(1, recipe.recipeName)
            ps.setObject(2, recipe.description)
            ps.setObject(3, recipe.ingredients)
            ps
        }, keyHolder)

        return keyHolder.keys?.get("recipe_id") as Int
    }

    fun getFavoriteRecipes(): Array<Recipe> {
        val recipe = jdbcTemplate.query("select recipe_id, name, description, ingredients from saved_recipe", recipeRowMapper)
        return recipe.toTypedArray()
    }

    fun deleteFavoriteRecipe(id: Int) {
        jdbcTemplate.update("delete from saved_recipe where recipe_id = ?", id)
    }
}