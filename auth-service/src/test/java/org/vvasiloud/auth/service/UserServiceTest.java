package org.vvasiloud.auth.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.exception.UserAlreadyExistsException;
import org.vvasiloud.auth.repository.UserRepository;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.mockito.internal.verification.VerificationModeFactory.times;

/**
 * Created by Aeon on 25/8/2016.
 *
 **/
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void createUser() throws UserAlreadyExistsException {

        User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");

        userService.create(user);
        verify(repository, times(1)).save(user);
    }

    @Test(expected = UserAlreadyExistsException.class)
    public void userAlreadyExists() throws UserAlreadyExistsException {

        User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");

        when(repository.findOne(user.getUsername())).thenReturn(new User());
        userService.create(user);
    }
}