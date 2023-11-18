package com.example.unihack_be.repository;

import com.example.unihack_be.entity.CancerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CancerTypeJPARepository extends JpaRepository<CancerType, Long> {
    List<CancerType> findAllByPatientId(Long patientId);
}
