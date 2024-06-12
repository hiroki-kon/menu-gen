package com.example.menu_generator

import java.time.LocalDate

class WeeklyRecipes {
    val startAt: LocalDate
    val recipes: Array<Recipe>


    constructor(startAt: String, recipes: Array<Recipe>) {
        this.startAt = LocalDate.parse(startAt)
        this.recipes = recipes
    }
}
