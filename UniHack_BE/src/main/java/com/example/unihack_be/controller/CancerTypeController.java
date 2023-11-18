package com.example.unihack_be.controller;

import com.example.unihack_be.dto.CancerTypeDTO;
import com.example.unihack_be.service.CancerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cancer-types")
public class CancerTypeController {
    private final CancerTypeService cancerTypeService;

    @Autowired
    public CancerTypeController(CancerTypeService cancerTypeService) {
        this.cancerTypeService = cancerTypeService;
    }

    @PostMapping
    public ResponseEntity<CancerTypeDTO> createCancerType(@RequestBody CancerTypeDTO cancerTypeDTO) {
        CancerTypeDTO createdCancerTypeDTO = cancerTypeService.createCancerType(cancerTypeDTO);
        URI location = URI.create("/cancer-types/" + createdCancerTypeDTO.getId());
        return ResponseEntity.created(location).body(createdCancerTypeDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CancerTypeDTO> getCancerTypeById(@PathVariable("id") Long id) {
        CancerTypeDTO cancerTypeDTO = cancerTypeService.getCancerTypeById(id);
        return ResponseEntity.ok(cancerTypeDTO);
    }

    @GetMapping
    public ResponseEntity<List<CancerTypeDTO>> getAllCancerTypes() {
        List<CancerTypeDTO> cancerTypes = cancerTypeService.getAllCancerTypes();
        return ResponseEntity.ok(cancerTypes);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<CancerTypeDTO>> getAllCancerTypesByPatientId(@PathVariable("id") Long patientId) {
        List<CancerTypeDTO> cancerTypes = cancerTypeService.getAllCancerTypesByPatientId(patientId);
        return ResponseEntity.ok(cancerTypes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCancerTypeById(@PathVariable("id") Long id) {
        cancerTypeService.deleteCancerTypeById(id);
        return ResponseEntity.ok().build();
    }
}
