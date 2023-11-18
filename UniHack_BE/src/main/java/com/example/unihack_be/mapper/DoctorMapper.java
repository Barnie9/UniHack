package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.entity.Doctor;
import org.mapstruct.Mapper;

@Mapper
public interface DoctorMapper {
     DoctorDTO map(Doctor doctor);
     Doctor map(DoctorDTO doctorDTO);
}
