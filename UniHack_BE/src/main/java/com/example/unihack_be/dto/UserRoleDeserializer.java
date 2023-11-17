package com.example.unihack_be.dto;

import com.example.unihack_be.entity.enums.UserRole;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class UserRoleDeserializer extends JsonDeserializer<UserRole> {
    @Override
    public UserRole deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        String value = p.getText();
        if (value == null || value.isEmpty()) {
            return null; // Handle empty or null values accordingly
        }
        return UserRole.valueOf(value.toUpperCase());
    }
}
