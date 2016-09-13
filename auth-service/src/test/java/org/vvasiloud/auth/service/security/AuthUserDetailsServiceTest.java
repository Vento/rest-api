package org.vvasiloud.auth.service.security;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.repository.UserRepository;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Aeon on 27/8/2016.
 */
public class AuthUserDetailsServiceTest {

    @InjectMocks
    private AuthUserDetailsService service;

    @Mock
    private UserRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void getUsernameWhenUserExists() {

        final User user = new User();

        when(repository.findOne(any())).thenReturn(user);
        UserDetails loaded = service.loadUserByUsername("Username");

        assertEquals(user, loaded);
    }

    @Test(expected = UsernameNotFoundException.class)
    public void getUsernameWhenUserNotExists() {
        service.loadUserByUsername("Username");
    }
}
