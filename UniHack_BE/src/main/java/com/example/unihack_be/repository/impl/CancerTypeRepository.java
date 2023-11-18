package com.example.unihack_be.repository.impl;

import com.example.unihack_be.dto.CancerTypeDTO;
import com.example.unihack_be.entity.CancerType;
import com.example.unihack_be.mapper.CancerTypeMapper;
import com.example.unihack_be.repository.CancerTypeJPARepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class CancerTypeRepository {
    private final CancerTypeJPARepository cancerTypeJPARepository;
    private final CancerTypeMapper cancerTypeMapper;

    public CancerTypeRepository(CancerTypeJPARepository cancerTypeJPARepository, CancerTypeMapper cancerTypeMapper) {
        this.cancerTypeJPARepository = cancerTypeJPARepository;
        this.cancerTypeMapper = cancerTypeMapper;
    }

    public List<CancerTypeDTO> findAllByPatientId(Long patientId) {
        List<CancerType> cancerTypes = cancerTypeJPARepository.findAllByPatientId(patientId);

        return cancerTypes.stream().map(cancerTypeMapper::entityToDto).collect(Collectors.toList());
    }
}
