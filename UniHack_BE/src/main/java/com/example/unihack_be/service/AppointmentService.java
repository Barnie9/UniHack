package com.example.unihack_be.service;

import com.example.unihack_be.dto.AppointmentDTO;

import java.util.List;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);

    AppointmentDTO getAppointmentById(Long id);

    List<AppointmentDTO> getAllAppointments();

    List<AppointmentDTO> getAllAppointmentsByPatientId(Long pacientId);

    List<AppointmentDTO> getAllAppointmentsByDoctorId(Long doctorId);

    void deleteAppointmentById(Long id);
}
