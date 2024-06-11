package com.example.menu_generator

import org.springframework.web.bind.annotation.*

data class FavoriteRecipeResponse (
    val recipe_id: Int
)

@RestController
@CrossOrigin(origins = arrayOf("*"))
@RequestMapping("/menus")
class MenuController(val menuService: MenuService) {
    @GetMapping("/")
    fun getMenus(): String {
        return "Here are menus!"
    }

    @GetMapping("/recommend")
    fun getRecommendMenu(@RequestParam("query") query: String): Array<Recipe> {
        return menuService.getRecommendMenu(query)
    }

    @PostMapping("/favorite")
    fun saveFavoriteRecipe(@RequestBody recipe: Recipe): FavoriteRecipeResponse {

        val id = menuService.saveFavoriteRecipe(recipe)
        return FavoriteRecipeResponse(id)
    }

}