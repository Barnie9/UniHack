package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.CancerTypeDTO;
import com.example.unihack_be.entity.CancerType;
import com.example.unihack_be.mapper.CancerTypeMapper;
import com.example.unihack_be.repository.CancerTypeJPARepository;
import com.example.unihack_be.repository.impl.CancerTypeRepository;
import com.example.unihack_be.service.CancerTypeService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CancerTypeServiceImpl implements CancerTypeService {
    private final CancerTypeRepository cancerTypeRepository;
    private final CancerTypeJPARepository cancerTypeJPARepository;
    private final CancerTypeMapper cancerTypeMapper;

    @Autowired
    public CancerTypeServiceImpl(CancerTypeRepository cancerTypeRepository, CancerTypeJPARepository cancerTypeJPARepository, CancerTypeMapper cancerTypeMapper) {
        this.cancerTypeRepository = cancerTypeRepository;
        this.cancerTypeJPARepository = cancerTypeJPARepository;
        this.cancerTypeMapper = cancerTypeMapper;
    }

    @Override
    public CancerTypeDTO createCancerType(CancerTypeDTO cancerTypeDTO) {
        CancerType createdCancerType = cancerTypeJPARepository.save(cancerTypeMapper.dtoToEntity(cancerTypeDTO));
        return cancerTypeMapper.entityToDto(createdCancerType);
    }

    @Override
    public CancerTypeDTO getCancerTypeById(Long id) {
        return cancerTypeJPARepository.findById(id)
                .map(cancerTypeMapper::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Could not find CancerType with id: " + id));
    }

    @Override
    public List<CancerTypeDTO> getAllCancerTypes() {
        List<CancerType> cancerTypes = cancerTypeJPARepository.findAll();
        return cancerTypes.stream().map(cancerTypeMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<CancerTypeDTO> getAllCancerTypesByPatientId(Long patientId) {
        List<CancerTypeDTO> cancerTypes = cancerTypeRepository.findAllByPatientId(patientId);
        return cancerTypes;
    }

    @Override
    public void deleteCancerTypeById(Long id) {
        if (!cancerTypeJPARepository.existsById(id)) {
            throw new EntityNotFoundException("Could not find CancerType with id: " + id);
        }
        cancerTypeJPARepository.deleteById(id);
    }

}
