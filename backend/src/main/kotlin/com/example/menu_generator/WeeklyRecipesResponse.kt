package com.example.menu_generator

import java.time.LocalDate

data class WeeklyRecipesResponse(
    val startAt: LocalDate,
    val recipes: Array<Recipe>
)
