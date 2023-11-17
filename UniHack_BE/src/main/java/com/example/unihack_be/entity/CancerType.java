package com.example.unihack_be.entity;


import jakarta.persistence.*;

@Entity
public class CancerType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String type;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

}
