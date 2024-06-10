package com.example.menu_generator

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MenuGeneratorApplicationTests(
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
) {

	@Test
	fun contextLoads() {
	}

	@Test
	fun `初期テスト`() {
		val response = restTemplate.getForEntity("http://localhost:$port/menus", String::class.java)
		// レスポンスのステータスコードは OK である。
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `recomendへのGETリクエストはOKステータスを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/menus/recommend?query=test", String::class.java)
		// レスポンスのステータスコードは OK である。
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `recomendへのGETリクエストは文字を返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/menus/recommend?query=test", String::class.java)
		val body = response.body!!
		// レスポンスのステータスコードは OK である。
		assertThat(body, equalTo("hogehogehoge"))
	}


}
