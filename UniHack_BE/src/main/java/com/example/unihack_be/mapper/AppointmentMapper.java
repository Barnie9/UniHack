package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.AppointmentDTO;
import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.entity.Appointment;
import com.example.unihack_be.entity.Doctor;
import com.example.unihack_be.repository.DoctorRepository;
import com.example.unihack_be.repository.PatientRepository;
import com.example.unihack_be.service.implementation.DoctorServiceImpl;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AppointmentMapper {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public Appointment dtoToEntity(AppointmentDTO appoinmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setId(appoinmentDTO.getId());
        appointment.setDate(appoinmentDTO.getDate());
        appointment.setHour(appoinmentDTO.getHour());
        appointment.setDoctor(doctorRepository.findById(appoinmentDTO.getDoctorId()).orElse(null));
        appointment.setPatient(patientRepository.findById(appoinmentDTO.getPatientId()).orElse(null));

        return appointment;
    }

    public AppointmentDTO entityToDto(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setDate(appointment.getDate());
        appointmentDTO.setHour(appointment.getHour());
        appointmentDTO.setDoctorId(appointment.getDoctor().getId());
        appointmentDTO.setPatientId(appointment.getPatient().getId());

        return appointmentDTO;
    }
}
