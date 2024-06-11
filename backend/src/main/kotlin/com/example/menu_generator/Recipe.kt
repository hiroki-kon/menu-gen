package com.example.menu_generator

data class Recipe(
    val recipe_id: Int? = null,
    val recipeName: String,
    val description: String,
    val ingredients: Array<String>
)
