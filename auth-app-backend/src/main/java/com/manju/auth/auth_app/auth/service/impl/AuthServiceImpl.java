package com.manju.auth.auth_app.auth.service.impl;

import com.manju.auth.auth_app.auth.payload.UserDTO;
import com.manju.auth.auth_app.auth.service.AuthService;
import com.manju.auth.auth_app.auth.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        //logic like verifying email, password, default roles, etc
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        //assign the default role


      return  userService.createUser(userDTO);
    }
}
