package com.example.unihack_be.service.implementation;

import com.example.unihack_be.dto.DoctorDTO;
import com.example.unihack_be.entity.Doctor;
import com.example.unihack_be.mapper.DoctorMapper;
import com.example.unihack_be.repository.DoctorRepository;
import com.example.unihack_be.service.DoctorService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, DoctorMapper doctorMapper) {
        this.doctorRepository = doctorRepository;
        this.doctorMapper = doctorMapper;
    }

    @Override
    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        Doctor createdDoctor = doctorRepository.save(doctorMapper.dtoToEntity(doctorDTO));
        return doctorMapper.entityToDto(createdDoctor);
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .map(doctorMapper::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Doctor with id: " + id));
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map(doctorMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public void updateDoctor(Long id, DoctorDTO updatedDoctorDTO) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Doctor with id: " + id));

        // Update fields
        existingDoctor.setFirstName(updatedDoctorDTO.getFirstName());
        existingDoctor.setLastName(updatedDoctorDTO.getLastName());
        existingDoctor.setEmail(updatedDoctorDTO.getEmail());
        existingDoctor.setPassword(updatedDoctorDTO.getPassword());
        existingDoctor.setPhoneNumber(updatedDoctorDTO.getPhoneNumber());

        // Save the updated Doctor
        doctorRepository.save(existingDoctor);
    }

    @Override
    public void deleteDoctorById(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new EntityNotFoundException("Could not find Doctor with id: " + id);
        }
        doctorRepository.deleteById(id);
    }
}
