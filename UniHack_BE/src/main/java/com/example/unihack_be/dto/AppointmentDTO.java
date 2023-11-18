package com.example.unihack_be.dto;

import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.entity.Doctor;
import com.example.unihack_be.entity.Patient;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentDTO {
    private Long id;
    private LocalDate date;
    private LocalTime time;
    private DoctorDTO doctorDTO;
    private PatientDTO patientDTO;
}
