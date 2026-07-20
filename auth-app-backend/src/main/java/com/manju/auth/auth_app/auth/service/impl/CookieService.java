package com.manju.auth.auth_app.auth.service.impl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter

public class CookieService {
  private final String refreshTokenCookieName;
  private final boolean cookieHttpOnly;
  private final boolean cookieSecure;
  private final String cookieDomain;
  private final String cookieSameSite;
  private final Logger logger =org.slf4j.LoggerFactory.getLogger(CookieService.class);

    public CookieService(
            @Value("${security.jwt.refresh-token-cookie-name}") String refreshTokenCookieName,
            @Value("${security.jwt.cookie-http-only}") boolean cookieHttpOnly,
            @Value("${security.jwt.cookie-secure}") boolean cookieSecure,
            @Value("${security.jwt.cookie-domain}") String cookieDomain,
            @Value("${security.jwt.cookie-same-site}") String cookieSameSite
    ){
        this.refreshTokenCookieName = refreshTokenCookieName;
        this.cookieHttpOnly = cookieHttpOnly;
        this.cookieSecure = cookieSecure;
        this.cookieDomain = cookieDomain;
        this.cookieSameSite = cookieSameSite;
    }

   //create method to attach cookie to response
public void attachRrefreshCookie(HttpServletResponse response, String value, int maxAge){

            logger.info("Attaching refresh token cookie: name={}, value={}, maxAge={}", refreshTokenCookieName, value, maxAge);
   var responseCookieBuilder =  ResponseCookie.from(refreshTokenCookieName, value)
            .httpOnly(cookieHttpOnly)
            .secure(cookieSecure)
            .path("/")
            .maxAge(maxAge)
            .sameSite(cookieSameSite);
            if(cookieDomain!=null&&cookieDomain !=null){
                responseCookieBuilder.domain(cookieDomain);
            }
           ResponseCookie responseCookie=  responseCookieBuilder.build();
            response.addHeader(HttpHeaders.SET_COOKIE,responseCookie.toString());
}
//clear refresh cookie
    public void clearRefreshCookie(HttpServletResponse response){
        var builder = ResponseCookie.from(refreshTokenCookieName,"").
                maxAge(0)
                .path("/")
                .httpOnly(cookieHttpOnly)
                .secure(cookieSecure)
                .sameSite(cookieSameSite);
        if (cookieDomain != null && !cookieDomain.isEmpty()) {
            builder.domain(cookieDomain);
        }

        ResponseCookie responseCookie = builder.build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }

    public void addNoStorageHeaders(HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
    }

}
