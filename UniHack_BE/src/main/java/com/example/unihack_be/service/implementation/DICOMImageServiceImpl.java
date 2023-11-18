package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.mapper.DICOMImageMapper;
import com.example.unihack_be.repository.DICOMImageRepository;
import com.example.unihack_be.service.DICOMImageService;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DICOMImageServiceImpl implements DICOMImageService {
    private final DICOMImageRepository dicomImageRepository;
    private final DICOMImageMapper dicomImageMapper = Mappers.getMapper(DICOMImageMapper.class);

    @Autowired
    public DICOMImageServiceImpl(DICOMImageRepository dicomImageRepository) {
        this.dicomImageRepository = dicomImageRepository;
    }

    public DICOMImageDTO createDICOMImage(DICOMImageDTO dicomImageDTO) {
        DICOMImage createdDICOMImage = dicomImageRepository.save(dicomImageMapper.map(dicomImageDTO));
        return dicomImageMapper.map(createdDICOMImage);

    }


    public List<DICOMImageDTO> getAllDICOMImagesByAppointmentId() {
        List<DICOMImage> dicomImages = dicomImageRepository.findAll();
        if(dicomImages.isEmpty()) {
            throw new EntityNotFoundException("No DICOMImages found!");
        }
        return dicomImages.stream().map(dicomImageMapper::map).collect(Collectors.toList());
    }

    public void deleteDICOMImageById(Long id) {
        dicomImageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Could not find DICOMImage " + id));
        dicomImageRepository.deleteById(id);

    }

    public void deleteAllDICOMImagesByAppointmentId(Long id) {
        dicomImageRepository.deleteAllByAppointmentId(id);

    }

    public DICOMImageDTO getDICOMImageById(Long id) {
        return dicomImageRepository.findById(id)
                .map(dicomImageMapper::map)
                .orElseThrow(() -> new EntityNotFoundException("Could not find DICOMImage " + id));
    }
}
