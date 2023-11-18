package com.example.unihack_be.service;

import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.entity.Doctor;

import java.util.List;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO doctorDTO);

    DoctorDTO getDoctorById(Long id);

    List<DoctorDTO> getAllDoctors();

    void updateDoctor(Long id, DoctorDTO updatedDoctorDTO);

    void deleteDoctorById(Long id);
}
