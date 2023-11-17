package com.example.unihack_be.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
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
