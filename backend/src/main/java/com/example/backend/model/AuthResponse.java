package com.example.backend.model;

public class AuthResponse {
    private String token;
    private String username;

    // getters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }
}