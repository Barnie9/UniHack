package com.example.unihack_be.dto;

import com.example.unihack_be.entity.MedicalFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalFileDTO {
    private Long id;
    private String path;
    private PatientDTO patientDTO;
}
