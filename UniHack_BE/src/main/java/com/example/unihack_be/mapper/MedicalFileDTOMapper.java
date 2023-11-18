package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.MedicalFileDTO;
import com.example.unihack_be.entity.MedicalFile;
import org.mapstruct.Mapper;

@Mapper
public interface MedicalFileDTOMapper {
     MedicalFileDTO map(MedicalFile medicalFile);
     MedicalFile map(MedicalFileDTO medicalFileDTO);
}
