package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.CancerTypeDTO;
import com.example.unihack_be.entity.CancerType;
import com.example.unihack_be.repository.PatientRepository;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class CancerTypeMapper {

    private final PatientRepository patientRepository;

    public CancerType dtoToEntity(CancerTypeDTO cancerTypeDTO) {
        CancerType cancerType = new CancerType();
        cancerType.setId(cancerTypeDTO.getId());
        cancerType.setType(cancerTypeDTO.getType());
        cancerType.setPatient(patientRepository.findById(cancerTypeDTO.getPatientId()).orElse(null));

        return cancerType;
    }

    public CancerTypeDTO entityToDto(CancerType cancerType) {
        CancerTypeDTO cancerTypeDTO = new CancerTypeDTO();
        cancerTypeDTO.setId(cancerType.getId());
        cancerTypeDTO.setType(cancerType.getType());
        cancerTypeDTO.setPatientId(cancerType.getPatient().getId());

        return cancerTypeDTO;
    }
}
