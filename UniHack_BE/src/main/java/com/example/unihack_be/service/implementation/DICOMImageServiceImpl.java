package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.mapper.DICOMImageMapper;
import com.example.unihack_be.repository.DICOMImageJPARepository;
import com.example.unihack_be.repository.impl.DICOMImageRepository;
import com.example.unihack_be.service.DICOMImageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DICOMImageServiceImpl implements DICOMImageService {
    private final DICOMImageRepository dicomImageRepository;
    private final DICOMImageJPARepository dicomImageJPARepository;
    private final DICOMImageMapper dicomImageMapper;

    @Autowired
    public DICOMImageServiceImpl(DICOMImageRepository dicomImageRepository, DICOMImageJPARepository dicomImageJPARepository, DICOMImageMapper dicomImageMapper) {
        this.dicomImageRepository = dicomImageRepository;
        this.dicomImageJPARepository = dicomImageJPARepository;
        this.dicomImageMapper = dicomImageMapper;
    }

    @Override
    public DICOMImageDTO createDICOMImage(DICOMImageDTO dicomImageDTO) {
        DICOMImage createdDICOMImage = dicomImageJPARepository.save(dicomImageMapper.dtoToEntity(dicomImageDTO));
        return dicomImageMapper.entityToDto(createdDICOMImage);
    }

    @Override
    public DICOMImageDTO getDICOMImageById(Long id) {
        return dicomImageJPARepository.findById(id)
                .map(dicomImageMapper::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Could not find DICOMImage with id: " + id));
    }

    @Override
    public List<DICOMImageDTO> getAllDICOMImages() {
        List<DICOMImage> dicomImages = dicomImageJPARepository.findAll();
        return dicomImages.stream().map(dicomImageMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<DICOMImageDTO> getAllDICOMImagesByPatientId(Long patientId) {
        List<DICOMImageDTO> dicomImages = dicomImageRepository.findAllByPatientId(patientId);
        return dicomImages;
    }

    @Override
    public void deleteDICOMImageById(Long id) {
        if (!dicomImageJPARepository.existsById(id)) {
            throw new EntityNotFoundException("Could not find DICOMImage with id: " + id);
        }
        dicomImageJPARepository.deleteById(id);
    }
}
