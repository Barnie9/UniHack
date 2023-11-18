package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.AppointmentDTO;
import com.example.unihack_be.entity.Appointment;
import com.example.unihack_be.mapper.AppointmentMapper;
import com.example.unihack_be.repository.AppointmentJPARepository;
import com.example.unihack_be.repository.impl.AppointmentRepository;
import com.example.unihack_be.service.AppointmentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentJPARepository appointmentJPARepository;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, AppointmentJPARepository appointmentJPARepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentJPARepository = appointmentJPARepository;
        this.appointmentMapper = appointmentMapper;
    }

    @Override
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Appointment createdAppointment = appointmentJPARepository.save(appointmentMapper.dtoToEntity(appointmentDTO));
        return appointmentMapper.entityToDto(createdAppointment);
    }

    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        return appointmentJPARepository.findById(id)
                .map(appointmentMapper::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Appointment with id: " + id));
    }

    @Override
    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentJPARepository.findAll();
        return appointments.stream().map(appointmentMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> getAllAppointmentsByPatientId(Long pacientId) {
        List<AppointmentDTO> appointments = appointmentRepository.findAllByPatientId(pacientId);
        return appointments;
    }

    @Override
    public List<AppointmentDTO> getAllAppointmentsByDoctorId(Long doctorId) {
        List<AppointmentDTO> appointments = appointmentRepository.findAllByDoctorId(doctorId);
        return appointments;
    }

    @Override
    public void deleteAppointmentById(Long id) {
        if (!appointmentJPARepository.existsById(id)) {
            throw new EntityNotFoundException("Could not find Appointment with id: " + id);
        }
        appointmentJPARepository.deleteById(id);
    }
}
