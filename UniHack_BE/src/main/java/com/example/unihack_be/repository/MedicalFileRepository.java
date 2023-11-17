package com.example.unihack_be.repository;

import com.example.unihack_be.entity.MedicalFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalFileRepository extends JpaRepository<MedicalFile, Long> {
}
