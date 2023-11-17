package com.example.unihack_be.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Doctor {

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

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;

}
