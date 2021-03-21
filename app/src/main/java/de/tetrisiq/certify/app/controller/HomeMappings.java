package de.tetrisiq.certify.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeMappings {

    @GetMapping("/")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/new")
    public String newDoc(Model model) {
        return "new";
    }

    @GetMapping("/verify")
    public String verify(Model model) {
        return "verify";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }
}