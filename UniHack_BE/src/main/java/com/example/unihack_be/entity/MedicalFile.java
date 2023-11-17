package com.example.unihack_be.entity;


import jakarta.persistence.*;

@Entity
public class MedicalFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String path;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

}
