package com.manju.auth.auth_app.auth.controllers;

import com.manju.auth.auth_app.auth.config.AppConstant;
import com.manju.auth.auth_app.auth.payload.UserDTO;
import com.manju.auth.auth_app.auth.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
//create user api
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        return ResponseEntity.status(HttpStatus.CREATED).
                body(userService.createUser(userDTO));
    }
//get all users
    @GetMapping
    public ResponseEntity<Iterable<UserDTO>>getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

//get user by email /api/v1/users/email/{email}

@GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmailId(email));
}

@PreAuthorize("hasRole('" +AppConstant.ADMIN_ROLE+"')")

@GetMapping("/userId/{userId}")
    public ResponseEntity<UserDTO> getUserByUserId(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserById(userId));
}



//update user /api/v1/users
    @Transactional
@PutMapping ("/{userId}")
public ResponseEntity<UserDTO> updateUserById( @RequestBody UserDTO userDTO, @PathVariable("userId")String userId){
return ResponseEntity.ok(userService.updateUser(userDTO, userId));

}

//delete user by id /api/v1/users/{id}
@DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
}
}
