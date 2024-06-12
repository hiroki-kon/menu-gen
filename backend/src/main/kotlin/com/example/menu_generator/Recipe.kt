package com.example.menu_generator

data class Recipe(
    val recipeId: Int? = null,
    val recipeName: String,
    val description: String,
    val ingredients: Array<String>
)
