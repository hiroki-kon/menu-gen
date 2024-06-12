package com.example.menu_generator

import java.time.LocalDate

class WeeklyRecipe(startAt: String, name: String, val description: String, val ingredients: Array<String>, val dayNum: Int) {
    val startAt: LocalDate = LocalDate.parse(startAt)
    val recipeName: String = name
}
