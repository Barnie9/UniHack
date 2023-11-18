package com.example.unihack_be.mapper;

import com.example.unihack_be.dto.AppointmentDTO;
import com.example.unihack_be.entity.Appointment;
import org.mapstruct.Mapper;

@Mapper
public interface AppointmentMapper {
    AppointmentDTO map(Appointment appointment);
    Appointment map(AppointmentDTO appointmentDTO);

}
