package com.example.unihack_be.repository;

import com.example.unihack_be.entity.DICOMImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface
DICOMImageRepository extends JpaRepository<DICOMImage, Long> {
    void deleteAllByAppointmentId(Long id);
}
