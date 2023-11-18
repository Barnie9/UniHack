package com.example.unihack_be.repository;

import com.example.unihack_be.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentJPARepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByPatientId(Long patientId);

    List<Appointment> findAllByDoctorId(Long doctorId);
}
