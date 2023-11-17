package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import org.mapstruct.Mapper;

@Mapper
public interface DICOMImageMapper {
    DICOMImageDTO map(DICOMImage dicomImage);
    DICOMImage map(DICOMImageDTO dicomImageDTO);

}
