package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.repository.AppointmentJPARepository;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class DICOMImageMapper {
    private final AppointmentJPARepository appointmentJPARepository;

    public DICOMImage dtoToEntity(DICOMImageDTO dicomImageDTO) {
        DICOMImage dicomImage = new DICOMImage();
        dicomImage.setId(dicomImageDTO.getId());
        dicomImage.setPath(dicomImageDTO.getPath());
        dicomImage.setAppointment(appointmentJPARepository.findById(dicomImageDTO.getAppointmentId()).orElse(null));

        return dicomImage;
    }

    public DICOMImageDTO entityToDto(DICOMImage dicomImage) {
        DICOMImageDTO dicomImageDTO = new DICOMImageDTO();
        dicomImageDTO.setId(dicomImage.getId());
        dicomImageDTO.setPath(dicomImage.getPath());
        dicomImageDTO.setAppointmentId(dicomImage.getAppointment().getId());

        return dicomImageDTO;
    }
}
