package com.manju.auth.auth_app;

import com.manju.auth.auth_app.auth.config.AppConstant;
import com.manju.auth.auth_app.auth.entity.Role;
import com.manju.auth.auth_app.auth.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class AuthAppApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;
	public static void main(String[] args) {
		SpringApplication.run(AuthAppApplication.class, args);




	}


	@Override
	public void run(String... args) throws Exception {
		//we will crete some default user roles
		//admin
		//guest

		roleRepository.findByName("ROLE_"+AppConstant.ADMIN_ROLE).ifPresentOrElse(role -> {
			System.out.println("admin role already exists "+role.getName());
		},()->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstant.ADMIN_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});

		roleRepository.findByName("ROLE_"+AppConstant.GUEST_ROLE).ifPresentOrElse(role -> {
			System.out.println("guest role already exists "+role.getName());
		},()->{
			Role role = new Role();
			role.setName("ROLE_"+AppConstant.GUEST_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});
	}

}


