package com.manju.auth.auth_app.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info =  @Info(
                title = "auth Application built by manjunath",
                description = "generic auth app used in any auth application",
                contact = @Contact(
                        name = "manjunath",
                        email = "manjunathakn.dev@gmail.com"),
                version = "1.0.0",
                summary = "this appis useful if you dont want to crate auth app from scratch"
        ),
        security ={
                @SecurityRequirement(name = "bearerAuth"),

        }

)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class ApiDocConfig {


}

