package de.tetrisiq.certify.model;

import lombok.*;
import lombok.extern.log4j.Log4j2;

import javax.persistence.*;

/**
 * Model class for a User
 */
@Getter
@Setter
@Entity
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String role;

    private String passwordHash;

    private String username;

}
