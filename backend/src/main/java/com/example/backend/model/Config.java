package com.example.backend.model;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {

        FilterRegistrationBean<JwtFilter> reg = new FilterRegistrationBean<>();

        reg.setFilter(new JwtFilter());
        reg.addUrlPatterns("/*");

        return reg;
    }
}