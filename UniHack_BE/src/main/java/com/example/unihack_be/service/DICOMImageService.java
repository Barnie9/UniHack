package com.example.unihack_be.service;

import com.example.unihack_be.dto.DICOMImageDTO;

import java.util.List;

public interface DICOMImageService {
    DICOMImageDTO createDICOMImage(DICOMImageDTO dicomImageDTO);

    DICOMImageDTO getDICOMImageById(Long id);

    List<DICOMImageDTO> getAllDICOMImages();

    List<DICOMImageDTO> getAllDICOMImagesByPatientId(Long patientId);

    void deleteDICOMImageById(Long id);
}
