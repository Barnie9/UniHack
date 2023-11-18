package com.example.unihack_be.custom_exceptions;

public class DoctorNotFoundException extends RuntimeException{
    public DoctorNotFoundException(Long id) {
        super("Doctor with ID " + id + " not found");
    }
}
