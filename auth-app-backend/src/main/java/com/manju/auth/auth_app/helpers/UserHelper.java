package com.manju.auth.auth_app.helpers;

import java.util.UUID;

public class UserHelper {
    public static UUID parseUUuid(String uuid){
        return UUID.fromString(uuid);
    }
}
