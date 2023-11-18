package com.example.unihack_be.dto;

import com.example.unihack_be.entity.enums.Gender;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

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
