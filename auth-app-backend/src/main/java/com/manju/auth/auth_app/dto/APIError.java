package com.manju.auth.auth_app.dto;

import java.time.OffsetDateTime;
import java.time.OffsetTime;

public record APIError(int status, String error, String message, String path, OffsetDateTime timeStamp) {


    public static APIError of(int status, String error, String message, String path, OffsetDateTime timeStamp) {
        return new APIError(status, error, message, path, timeStamp);
    }
}