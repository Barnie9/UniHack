package com.example.unihack_be.service;

import com.example.unihack_be.dto.CancerTypeDTO;

import java.util.List;

public interface CancerTypeService {
    CancerTypeDTO createCancerType(CancerTypeDTO cancerTypeDTO);

    CancerTypeDTO getCancerTypeById(Long id);

    List<CancerTypeDTO> getAllCancerTypes();


    List<CancerTypeDTO> getAllCancerTypesByPatientId(Long patientId);

    void deleteCancerTypeById(Long id);
}
