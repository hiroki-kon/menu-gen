package com.example.menu_generator

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MenusController {
    @GetMapping("/menus")
    fun getMenus(): String {
        return "Here are menus!"
    }
}