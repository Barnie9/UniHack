package com.example.unihack_be.dto;

import com.example.unihack_be.entity.CancerType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CancerTypeDTO {
    private Long id;
    private String type;
    private String description;
    private PatientDTO patientDTO;
}
