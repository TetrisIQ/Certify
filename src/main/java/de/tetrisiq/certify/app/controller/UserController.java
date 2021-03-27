package de.tetrisiq.certify.app.controller;

import de.tetrisiq.certify.app.config.UserService;
import de.tetrisiq.certify.app.controller.requests.NewUser;
import de.tetrisiq.certify.app.model.UserModel;
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
        Optional<UserModel> optionalUser = userService.addNewUser(newUser);
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
