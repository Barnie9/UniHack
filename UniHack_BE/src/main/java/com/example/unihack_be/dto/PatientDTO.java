package com.example.unihack_be.dto;

import com.example.unihack_be.entity.Patient;
import com.example.unihack_be.entity.enums.Gender;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    @JsonDeserialize(using = GenderDeserializer.class)
    private Gender gender;
    private int age;
}
