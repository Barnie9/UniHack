package com.example.unihack_be.service;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;

import java.util.List;

public interface DICOMImageService {
    DICOMImageDTO createDICOMImage(DICOMImageDTO dicomImageDTO);
    List<DICOMImageDTO> getAllDICOMImagesByAppointmentId();
    void deleteDICOMImageById(Long id);
    void deleteAllDICOMImagesByAppointmentId(Long id);
    DICOMImageDTO getDICOMImageById(Long id);
}
