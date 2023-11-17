package com.example.unihack_be.dto;

import com.example.unihack_be.entity.Appointment;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DICOMImageDTO {
    private Long id;
    private String path;
    private Appointment appointment;

}
