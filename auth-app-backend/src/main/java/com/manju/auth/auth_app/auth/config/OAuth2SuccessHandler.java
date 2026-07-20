package com.manju.auth.auth_app.auth.config;

import com.manju.auth.auth_app.auth.entity.Provider;
import com.manju.auth.auth_app.auth.entity.RefreshToken;
import com.manju.auth.auth_app.auth.entity.User;
import com.manju.auth.auth_app.auth.repository.RefreshTokenRepository;
import com.manju.auth.auth_app.auth.repository.UserRepository;
import com.manju.auth.auth_app.auth.service.impl.CookieService;
import com.manju.auth.auth_app.auth.service.impl.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontEndSuccessUrl;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        logger.info("successful authentication");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        User user = null;

        if (authentication instanceof OAuth2AuthenticationToken token) {

            String registrationId = token.getAuthorizedClientRegistrationId();
            logger.info("Registration Id: {}", registrationId);
            logger.info("OAuth2 Attributes: {}", oAuth2User.getAttributes());

            switch (registrationId) {

                case "google":

                    String email = oAuth2User.getAttribute("email");
                    String name = oAuth2User.getAttribute("name");
                    String picture = oAuth2User.getAttribute("picture");

                    user = userRepository.findByEmail(email).orElse(null);

                    if (user == null) {

                        user = User.builder()
                                .email(email)
                                .name(name)
                                .image(picture)
                                .enable(true)
                                .provider(Provider.GOOGLE)
                                .build();

                        user = userRepository.save(user);

                        logger.info("New Google user saved");
                    } else {

                        logger.info("Existing Google user");
                    }

                    break;

                case "github":

                    String githubEmail = oAuth2User.getAttribute("email");
                    String githubName = oAuth2User.getAttribute("name");
                    String githubImage = oAuth2User.getAttribute("avatar_url");
                    String githubLogin = oAuth2User.getAttribute("login");

                    if (githubEmail == null || githubEmail.isBlank()) {
                        githubEmail = githubLogin + "@github.local";
                    }

                    if (githubName == null || githubName.isBlank()) {
                        githubName = githubLogin;
                    }

                    user = userRepository.findByEmail(githubEmail).orElse(null);

                    if (user == null) {

                        user = User.builder()
                                .email(githubEmail)
                                .name(githubName)
                                .image(githubImage)
                                .enable(true)
                                .provider(Provider.GITHUB)
                                .build();

                        user = userRepository.save(user);

                        logger.info("New GitHub user saved");
                    } else {

                        logger.info("Existing GitHub user");
                    }

                    break;

                default:
                    throw new IllegalArgumentException("Invalid registration id: " + registrationId);
            }
        }

        //revoke refresh tokens


        String jti = UUID.randomUUID().toString();

        RefreshToken refreshTokenObj = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .isRevoked(false)
                .build();

        refreshTokenRepository.save(refreshTokenObj);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenObj.getJti());

        cookieService.attachRrefreshCookie(
                response,
                refreshToken,
                (int) jwtService.getRefreshTtlSeconds());

        cookieService.addNoStorageHeaders(response);

        response.setContentType("application/json");
            response.sendRedirect(frontEndSuccessUrl);
    }
}