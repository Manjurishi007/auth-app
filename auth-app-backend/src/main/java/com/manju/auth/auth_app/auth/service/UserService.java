package com.manju.auth.auth_app.auth.service;

import com.manju.auth.auth_app.auth.payload.UserDTO;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);

    UserDTO getUserByEmailId(String email);

    UserDTO updateUser(UserDTO userDTO, String id);

    void deleteUser(String id);

    UserDTO getUserById(String userId);

    Iterable<UserDTO> getAllUsers();



}
