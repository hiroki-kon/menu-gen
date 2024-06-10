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

@Repository
class MenuRepository( val restTemplate: RestTemplate) {

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
}