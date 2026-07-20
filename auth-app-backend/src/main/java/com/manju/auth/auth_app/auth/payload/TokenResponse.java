package com.manju.auth.auth_app.auth.payload;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        String expiresIn,
        String tokenType,
        UserDTO user
) {
    public static TokenResponse of(String accessToken, String refreshToken, String expiresIn, String tokenType, UserDTO user) {
        return new TokenResponse(accessToken, refreshToken, expiresIn, "bearer", user);
    }
}
