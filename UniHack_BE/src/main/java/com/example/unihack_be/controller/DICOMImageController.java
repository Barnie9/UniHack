package com.example.unihack_be.controller;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.service.DICOMImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/dicom-images")
public class DICOMImageController {
    private final DICOMImageService dicomImageService;

    public DICOMImageController(DICOMImageService dicomImageService) {
        this.dicomImageService = dicomImageService;
    }

    @PostMapping
    public ResponseEntity<DICOMImageDTO> createDICOMImage(@RequestBody DICOMImageDTO dicomImageDTO) {
        DICOMImageDTO createdDICOMImageDTO = dicomImageService.createDICOMImage(dicomImageDTO);
        URI location = URI.create("/dicom-images/" + createdDICOMImageDTO.getId());
        return ResponseEntity.created(location).body(createdDICOMImageDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DICOMImageDTO> getDICOMImageById(@PathVariable("id") Long id) {
        DICOMImageDTO dicomImageDTO = dicomImageService.getDICOMImageById(id);
        return ResponseEntity.ok(dicomImageDTO);
    }

    @GetMapping
    public ResponseEntity<List<DICOMImageDTO>> getAllDICOMImages() {
        List<DICOMImageDTO> dicomImages = dicomImageService.getAllDICOMImages();
        return ResponseEntity.ok(dicomImages);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<DICOMImageDTO>> getAllDICOMImagesByPatientId(@PathVariable("id") Long patientId) {
        List<DICOMImageDTO> dicomImages = dicomImageService.getAllDICOMImagesByPatientId(patientId);
        return ResponseEntity.ok(dicomImages);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDICOMImageById(@PathVariable("id") Long id) {
        dicomImageService.deleteDICOMImageById(id);
        return ResponseEntity.ok().build();
    }
}
