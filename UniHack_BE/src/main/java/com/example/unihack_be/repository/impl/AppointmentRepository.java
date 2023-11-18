package com.example.unihack_be.repository.impl;

import com.example.unihack_be.dto.AppointmentDTO;
import com.example.unihack_be.entity.Appointment;
import com.example.unihack_be.mapper.AppointmentMapper;
import com.example.unihack_be.repository.AppointmentJPARepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AppointmentRepository {
    private final AppointmentJPARepository appointmentJPARepository;
    private final AppointmentMapper appointmentMapper;

    public AppointmentRepository(AppointmentJPARepository appointmentJPARepository, AppointmentMapper appointmentMapper) {
        this.appointmentJPARepository = appointmentJPARepository;
        this.appointmentMapper = appointmentMapper;
    }

    public List<AppointmentDTO> findAllByPatientId(Long patientId) {
        List<Appointment> appointments = appointmentJPARepository.findAllByPatientId(patientId);

        return appointments.stream().map(appointmentMapper::entityToDto).collect(Collectors.toList());
    }

    public List<AppointmentDTO> findAllByDoctorId(Long doctorId) {
        List<Appointment> appointments = appointmentJPARepository.findAllByDoctorId(doctorId);

        return appointments.stream().map(appointmentMapper::entityToDto).collect(Collectors.toList());
    }
}
