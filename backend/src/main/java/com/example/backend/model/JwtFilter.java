package com.example.backend.model;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                String username = JwtUtil.extractUsername(token);
                System.out.println("Authenticated user: " + username);

            } catch (Exception e) {
                // ❗ NE bacamo exception
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.getWriter().write("Invalid token");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}