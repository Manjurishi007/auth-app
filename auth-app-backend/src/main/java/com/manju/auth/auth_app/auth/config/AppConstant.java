package com.manju.auth.auth_app.auth.config;

public class AppConstant {

    public static final String [] AUTH_PUBLIC_URL={
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/api/v1/auth/**"
    };

    public static final String [] AUTH_ADMIN_URLS =  { "/api/v1/users/**"};

    public static final String [] AUTH_GUEST_URLS = {};


    public static final String ADMIN_ROLE = "ADMIN";
    public static final String GUEST_ROLE = "GUEST";

    //other project related constants

}
