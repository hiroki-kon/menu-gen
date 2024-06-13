package com.example.menu_generator

import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RecommendTest(
    @Autowired val restTemplate: TestRestTemplate,
    @LocalServerPort val port: Int,
    @Autowired val mockMvc: MockMvc,
) {
    @MockBean
    private lateinit var menuService: MenuService

    @Test
    fun `recomendへのGETリクエストはOKステータスを返す`() {
        mockMvc.perform(get("/menus/recommend?query=test")).andExpect(status().isOk())
    }

    //	TODO: このテストをしっかり行う
    @Test
    fun `recommendへのGETリクエストはRecipeのリストを返す`() {
        `when`(menuService.getRecommendMenu("test"))
            .thenReturn(
                arrayOf(Recipe(recipeName = "hoge", description = "fuga", ingredients = arrayOf("piyo"))))
        mockMvc.perform(get("/menus/recommend?query=test"))
            .andExpect(jsonPath("$[0].recipeName").value("hoge"))
            .andExpect(jsonPath("$[0].description").value("fuga"))
            .andExpect(jsonPath("$[0].ingredients[0]").value("piyo"))
    }
}