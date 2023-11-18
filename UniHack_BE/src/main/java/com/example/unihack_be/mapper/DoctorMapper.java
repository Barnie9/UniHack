package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.entity.Doctor;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class DoctorMapper {

    public Doctor dtoToEntity(DoctorDTO doctorDTO) {
        Doctor doctor = new Doctor();
        doctor.setId(doctorDTO.getId());
        doctor.setFirstName(doctorDTO.getFirstName());
        doctor.setLastName(doctorDTO.getLastName());
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setPassword(doctorDTO.getPassword());
        doctor.setPhoneNumber(doctorDTO.getPhoneNumber());

        return doctor;
    }

    public DoctorDTO entityToDto(Doctor doctor) {
        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setId(doctor.getId());
        doctorDTO.setFirstName(doctor.getFirstName());
        doctorDTO.setLastName(doctor.getLastName());
        doctorDTO.setEmail(doctor.getEmail());
        doctorDTO.setPassword(doctor.getPassword());
        doctorDTO.setPhoneNumber(doctor.getPhoneNumber());

        return doctorDTO;
    }
}

