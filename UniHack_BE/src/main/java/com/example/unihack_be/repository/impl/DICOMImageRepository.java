package com.example.unihack_be.repository.impl;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.mapper.DICOMImageMapper;
import com.example.unihack_be.repository.DICOMImageJPARepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class DICOMImageRepository {
    private final DICOMImageJPARepository dicomImageJPARepository;
    private final DICOMImageMapper dicomImageMapper;

    public DICOMImageRepository(DICOMImageJPARepository dicomImageJPARepository, DICOMImageMapper dicomImageMapper) {
        this.dicomImageJPARepository = dicomImageJPARepository;
        this.dicomImageMapper = dicomImageMapper;
    }

    public List<DICOMImageDTO> findAllByPatientId(Long patientId) {
        List<DICOMImage> dicomImages = dicomImageJPARepository.findAllByPatientId(patientId);

        return dicomImages.stream().map(dicomImageMapper::entityToDto).collect(Collectors.toList());
    }
}
