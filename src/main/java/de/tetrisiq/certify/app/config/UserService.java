package de.tetrisiq.certify.app.config;

import de.tetrisiq.certify.app.controller.requests.NewUser;
import de.tetrisiq.certify.app.model.UserModel;
import de.tetrisiq.certify.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
/**
 * UserService to get information about the current user
 */
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    WebSecurityInterface webSecurityConfig;

    /**
     * Get the currently
     *
     * @return Optional from {@link UserModel}
     */
    public Optional<UserModel> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserModel> user = userRepository.findByUsername(((UserDetails) auth.getPrincipal()).getUsername());
        if (user.isPresent()) {
            return Optional.of(user.get());
        }
        return Optional.empty();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return userDetails(user.get());
        }
        return null;
    }

    private org.springframework.security.core.userdetails.User userDetails(UserModel user) {
        List privileges = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPasswordHash(), true, true, true, true, privileges);
    }

    public Optional<UserModel> addNewUser(NewUser newUser) {
        Optional<UserModel> userOptional = userRepository.findByUsername(newUser.getUsername());
        if (!userOptional.isPresent()) {
            UserModel user = UserModel.builder().role("USER").passwordHash(webSecurityConfig.passwordEncoder().encode(newUser.getPassword())).username(newUser.getUsername()).build();
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public String changePassword(String newPassword) {
        UserModel user = currentUser().get();
        user.setPasswordHash(this.webSecurityConfig.passwordEncoder().encode(newPassword));
        userRepository.save(user);
        return "OK";
    }
}