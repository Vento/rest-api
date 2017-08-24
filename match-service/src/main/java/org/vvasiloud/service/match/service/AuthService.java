package org.vvasiloud.service.match.service;

import java.security.Principal;

public interface AuthService {
    Principal authenticateToken(String token);
}
