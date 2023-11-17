package com.example.unihack_be.entity;

import com.example.unihack_be.entity.enums.Gender;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String phoneNumber;

    @Column
    private Gender gender;

    @OneToMany(mappedBy = "patient")
    private List<MedicalFile> medicalFiles;
}
