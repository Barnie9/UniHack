package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.PatientDTO;
import com.example.unihack_be.entity.Patient;
import com.example.unihack_be.mapper.PatientMapper;
import com.example.unihack_be.repository.PatientRepository;
import com.example.unihack_be.service.PatientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository, PatientMapper patientMapper) {
        this.patientRepository = patientRepository;
        this.patientMapper = patientMapper;
    }

    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient createdPatient = patientRepository.save(patientMapper.dtoToEntity(patientDTO));
        return patientMapper.entityToDto(createdPatient);
    }

    @Override
    public PatientDTO getPatientById(Long id) {
        return patientRepository.findById(id)
                .map(patientMapper::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Patient with id: " + id));
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map(patientMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public void updatePatient(Long id, PatientDTO updatedPatientDTO) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Patient with id: " + id));

        // Update fields
        existingPatient.setFirstName(updatedPatientDTO.getFirstName());
        existingPatient.setLastName(updatedPatientDTO.getLastName());
        existingPatient.setEmail(updatedPatientDTO.getEmail());
        existingPatient.setPassword(updatedPatientDTO.getPassword());
        existingPatient.setPhoneNumber(updatedPatientDTO.getPhoneNumber());
        existingPatient.setAge(updatedPatientDTO.getAge());
        existingPatient.setGender(updatedPatientDTO.getGender());

        // Save the updated Patient
        patientRepository.save(existingPatient);
    }

    @Override
    public void deletePatientById(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new EntityNotFoundException("Could not find Patient with id: " + id);
        }
        patientRepository.deleteById(id);
    }
}
