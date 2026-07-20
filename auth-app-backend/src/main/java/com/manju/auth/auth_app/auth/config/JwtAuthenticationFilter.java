package com.manju.auth.auth_app.auth.config;

import com.manju.auth.auth_app.auth.service.impl.JwtService;
import com.manju.auth.auth_app.helpers.UserHelper;
import com.manju.auth.auth_app.auth.repository.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        logger.info("Authorization header: {} " , header);

        if (header != null && header.startsWith("Bearer ")) {

            // token extract and validate and authenticate and security context
            String token = header.substring(7);

            try {

                Jws<Claims> parse = jwtService.parse(token);
                Claims payload = parse.getPayload();

                String userId = payload.getSubject();
                UUID uuid = UserHelper.parseUUuid(userId);

                userRepository.findById(uuid).ifPresent(user -> {

                    // check whether user is enabled
                    if (user.isEnable()) {

                        List<GrantedAuthority> authorities =
                                user.getRoles() == null
                                        ? List.of()
                                        : user.getRoles()
                                        .stream()
                                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                                        .collect(Collectors.toUnmodifiableList());

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user.getEmail(),
                                        null,
                                        authorities
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        // set authentication only if not already present
                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            SecurityContextHolder.getContext()
                                    .setAuthentication(authentication);
                        }
                    }
                });

            } catch (ExpiredJwtException e) {
                request.setAttribute("error", "token expired");
//            e.printStackTrace();
            }
            catch (MalformedJwtException e) {
                request.setAttribute("error", "malformed token");
//            e.printStackTrace();

            } catch (JwtException e) {
                request.setAttribute("error", "invalid token");
//            e.printStackTrace();
            } catch (Exception e) {
                request.setAttribute("error", "an error occurred");
//                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth");


    }
}