package de.tetrisiq.certify.controller;

import de.tetrisiq.certify.config.UserService;
import de.tetrisiq.certify.controller.requests.NewUser;
import de.tetrisiq.certify.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/api/user/new")
    public String addNewUser(@RequestBody NewUser newUser) {
        Optional<User> optionalUser = userService.addNewUser(newUser);
        if (optionalUser.isPresent()) {
            return "OKAY";
        } else {
            return "ERROR"; //TODO: throw exception
        }
    }

    /**
     * To check username and password, will check in spring security
     */
    @PostMapping("/api/login")
    public String login() {
        return "OK";
    }

    @PostMapping("/api/user/password/change")
    public String changePassword(@RequestParam String newPassword) {
        return userService.changePassword(newPassword);
    }

}
