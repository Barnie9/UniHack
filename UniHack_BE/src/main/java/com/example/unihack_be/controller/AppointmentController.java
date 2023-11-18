package com.example.unihack_be.controller;

import com.example.unihack_be.dto.AppointmentDTO;
import com.example.unihack_be.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO createdAppointmentDTO = appointmentService.createAppointment(appointmentDTO);
        URI location = URI.create("/appointments/" + createdAppointmentDTO.getId());
        return ResponseEntity.created(location).body(createdAppointmentDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable("id") Long id) {
        AppointmentDTO appointmentDTO = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointmentDTO);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointmentsByPatientId(@PathVariable("id") Long pacientId) {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointmentsByPatientId(pacientId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointmentsByDoctorId(@PathVariable("id") Long doctorId) {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointmentsByDoctorId(doctorId);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointmentById(@PathVariable("id") Long id) {
        appointmentService.deleteAppointmentById(id);
        return ResponseEntity.ok().build();
    }
}
