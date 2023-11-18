package com.example.unihack_be.controller;

import com.example.unihack_be.dto.DICOMImageDTO;
import com.example.unihack_be.entity.DICOMImage;
import com.example.unihack_be.service.DICOMImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("DICOMImages")
public class DICOMImageController {
    private final DICOMImageService DICOMImageService;

    @Autowired
    public DICOMImageController(DICOMImageService DICOMImageService) {
        this.DICOMImageService = DICOMImageService;
    }

    @PostMapping
    public ResponseEntity<DICOMImage> createDICOMImage (@RequestBody DICOMImageDTO DICOMImageDTO) {
        DICOMImageDTO savedDICOMImageDTO = DICOMImageService.createDICOMImage(DICOMImageDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedDICOMImageDTO.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<DICOMImageDTO> getDICOMImageById(@PathVariable("id") Long id) {
        DICOMImageDTO DICOMImageDTO = DICOMImageService.getDICOMImageById(id);
        return ResponseEntity.ok(DICOMImageDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDICOMImageById(@PathVariable("id") Long id) {
        DICOMImageService.deleteDICOMImageById(id);
        return ResponseEntity.ok().build();
    }



}
