package com.example.menu_generator

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import java.time.LocalDate

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MenuGeneratorApplicationTests(
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
) {

	@Test
	fun contextLoads() {
	}

	@Test
	fun `recomendへのGETリクエストはOKステータスを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/menus/recommend?query=test", String::class.java)
		// レスポンスのステータスコードは OK である。
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

//	TODO: このテストをしっかり行う
//	@Test
//	fun `recomendへのGETリクエストは文字を返す`() {
//		val response = restTemplate.getForEntity("http://localhost:$port/menus/recommend?query=test", String::class.java)
//		val body = response.body!!
//		// レスポンスのステータスコードは OK である。
//		assertThat(body, equalTo("hogehogehoge"))
//	}

	@Test
	fun `weeklyへのPOSTリクエストはOKステータスを返す`() {
		val request = WeeklyRecipesRequest(
			startAt = "2020-02-15",
			recipes = arrayOf(Recipe(recipeName = "hoge", description = "fuga", ingredients = arrayOf("piyo")))
		)
		val response = restTemplate.postForEntity("http://localhost:$port/menus/weekly", request, Unit::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}


	@Test
	fun `weeklyへのGETリクエストはOKステータスを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/menus/weekly", WeeklyRecipesResponse::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `weeklyへのGETリクエストはWeeklyRecipesを返す`() {
		val request = WeeklyRecipesRequest(
			startAt = "2020-02-15",
			recipes = arrayOf(Recipe(recipeName = "hoge", description = "fuga", ingredients = arrayOf("piyo")))
		)
		restTemplate.postForEntity("http://localhost:$port/menus/weekly", request, Unit::class.java)

		val response = restTemplate.getForEntity("http://localhost:$port/menus/weekly", WeeklyRecipesResponse::class.java)
		val weeklyRecipe = response.body!!
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
		assertThat(weeklyRecipe.startAt, equalTo(LocalDate.parse("2020-02-15")))
		assertThat(weeklyRecipe.recipes[0].recipeName, equalTo("hoge"))
		assertThat(weeklyRecipe.recipes[0].description, equalTo("fuga"))
		assertThat(weeklyRecipe.recipes[0].ingredients, equalTo(arrayOf("piyo")))
	}

}
