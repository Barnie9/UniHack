package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.PatientDTO;
import com.example.unihack_be.entity.Patient;
import org.mapstruct.Mapper;

@Mapper
public interface PatientMapper {
     PatientDTO map(Patient patient);
     Patient map(PatientDTO patientDTO);
}
