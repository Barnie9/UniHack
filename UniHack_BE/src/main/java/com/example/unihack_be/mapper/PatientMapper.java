package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.PatientDTO;
import com.example.unihack_be.entity.Patient;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class PatientMapper {

    public Patient dtoToEntity(PatientDTO patientDTO) {
        Patient patient = new Patient();
        patient.setId(patientDTO.getId());
        patient.setFirstName(patientDTO.getFirstName());
        patient.setLastName(patientDTO.getLastName());
        patient.setEmail(patientDTO.getEmail());
        patient.setPassword(patientDTO.getPassword());
        patient.setPhoneNumber(patientDTO.getPhoneNumber());
        patient.setGender(patientDTO.getGender());
        patient.setAge(patientDTO.getAge());

        return patient;
    }

    public PatientDTO entityToDto(Patient patient) {
        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setId(patient.getId());
        patientDTO.setFirstName(patient.getFirstName());
        patientDTO.setLastName(patient.getLastName());
        patientDTO.setEmail(patient.getEmail());
        patientDTO.setPassword(patient.getPassword());
        patientDTO.setPhoneNumber(patient.getPhoneNumber());
        patientDTO.setGender(patient.getGender());
        patientDTO.setAge(patient.getAge());

        return patientDTO;
    }
}
