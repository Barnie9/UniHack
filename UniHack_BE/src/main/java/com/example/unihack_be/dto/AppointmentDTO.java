package com.example.unihack_be.dto;

import com.example.unihack_be.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private LocalDate date;
    private LocalTime hour;
    private DoctorDTO doctorDTO;
    private PatientDTO patientDTO;
}