package com.example.unihack_be.dto;

import com.example.unihack_be.entity.enums.Gender;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class GenderDeserializer extends JsonDeserializer<Gender> {
    @Override
    public Gender deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        String value = p.getText();
        if (value == null || value.isEmpty()) {
            return null; // Handle empty or null values accordingly
        }
        return Gender.valueOf(value.toUpperCase());
    }
}
