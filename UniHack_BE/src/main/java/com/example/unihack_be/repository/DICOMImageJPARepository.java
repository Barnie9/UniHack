package com.example.unihack_be.repository;

import com.example.unihack_be.entity.DICOMImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DICOMImageJPARepository extends JpaRepository<DICOMImage, Long> {
    List<DICOMImage> findAllByPatientId(Long patientId);
}
