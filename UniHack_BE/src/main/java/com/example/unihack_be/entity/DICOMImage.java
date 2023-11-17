package com.example.unihack_be.entity;

import jakarta.persistence.*;

@Entity
public class DICOMImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String path;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;


}
