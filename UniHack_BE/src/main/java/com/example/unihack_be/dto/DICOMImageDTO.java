package com.example.unihack_be.dto;

import com.example.unihack_be.entity.Appointment;
import com.example.unihack_be.entity.DICOMImage;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DICOMImageDTO {
    private Long id;
    private String path;
    private AppointmentDTO appointmentDTO;

}
