package com.manju.auth.auth_app.auth.service.impl;

import com.manju.auth.auth_app.auth.config.AppConstant;
import com.manju.auth.auth_app.auth.payload.UserDTO;
import com.manju.auth.auth_app.auth.entity.Provider;
import com.manju.auth.auth_app.auth.entity.Role;
import com.manju.auth.auth_app.auth.entity.User;
import com.manju.auth.auth_app.auth.exception.ResourceNotFoundException;
import com.manju.auth.auth_app.helpers.UserHelper;
import com.manju.auth.auth_app.auth.repository.RoleRepository;
import com.manju.auth.auth_app.auth.repository.UserRepository;
import com.manju.auth.auth_app.auth.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {

        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Uer with given email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);

        user.setProvider(
                userDTO.getProvider() != null
                        ? userDTO.getProvider()
                        : Provider.LOCAL
        );


        Role role =  roleRepository.findByName("ROLE_"+ AppConstant.GUEST_ROLE).orElse(null);
        user.getRoles().add(role);
        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDTO.class);
    }


    @Override
    public UserDTO getUserByEmailId(String email) {
        User user = userRepository.findByEmail(email).
                orElseThrow(()->new ResourceNotFoundException("user not found with the given mail id!"));
        return modelMapper.map(user, UserDTO.class);


    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String id) {
       UUID uuid = UserHelper.parseUUuid(id);
        User existingUser = userRepository.findById(uuid).orElseThrow(()-> new ResourceNotFoundException("user not found in the given id"));
        //cannot update email in this project as email id is not null and unique
        if(userDTO.getName()!=null) existingUser.setName(userDTO.getName());
        if(userDTO.getImage()!=null) existingUser.setImage(userDTO.getImage());
        if(userDTO.getProvider()!=null) existingUser.setProvider(userDTO.getProvider());
        //todo:change password updation logic
        if (userDTO.getPassword()!=null) existingUser.setPassword(userDTO.getPassword());
        existingUser.setEnable(userDTO.isEnable());
        existingUser.setUpdatedAt(Instant.now());

        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);


    }

    @Transactional
    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUUuid(userId);
      User user =   userRepository.findById(uId).orElseThrow(()->new ResourceNotFoundException("user not found with that id"));
        userRepository.delete(user);
    }

    @Override
    @Transactional
    public UserDTO getUserById(String userId) {
        UUID uuid = UserHelper.parseUUuid(userId);
      User user =  userRepository.findById(uuid).orElseThrow(()->new ResourceNotFoundException("the user with this id is not found"));
       return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public Iterable<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }
}