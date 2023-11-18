package com.example.unihack_be.controller;

import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<DoctorDTO> createDoctor(@RequestBody DoctorDTO doctorDTO) {
        DoctorDTO createdDoctorDTO = doctorService.createDoctor(doctorDTO);
        URI location = URI.create("/doctors/" + createdDoctorDTO.getId());
        return ResponseEntity.created(location).body(createdDoctorDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable("id") Long id) {
        DoctorDTO doctorDTO = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctorDTO);
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDoctor(@PathVariable("id") Long id, @RequestBody DoctorDTO updatedDoctorDTO) {
        doctorService.updateDoctor(id, updatedDoctorDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctorById(@PathVariable("id") Long id) {
        doctorService.deleteDoctorById(id);
        return ResponseEntity.ok().build();
    }
}

