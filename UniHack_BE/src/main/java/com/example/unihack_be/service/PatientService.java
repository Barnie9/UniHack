package com.example.unihack_be.service;

import com.example.unihack_be.dto.PatientDTO;

import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO patientDTO);

    PatientDTO getPatientById(Long id);

    List<PatientDTO> getAllPatients();

    void updatePatient(Long id, PatientDTO updatedPatientDTO);

    void deletePatientById(Long id);
}
