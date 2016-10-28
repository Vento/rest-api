package org.vvasiloud.auth.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.vvasiloud.auth.AuthServiceApplication;
import org.vvasiloud.auth.domain.User;

import static org.junit.Assert.assertEquals;

/**
 * Created by Aeon on 25/8/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthServiceApplication.class)
public class UserRepositoryTest {
    @Autowired
    private UserRepository repository;

    @Test
    public void saveAndfindUserByName() {

        User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");
        repository.save(user);

        User found = repository.findOne(user.getUsername());
        assertEquals(user.getUsername(), found.getUsername());
        assertEquals(user.getPassword(), found.getPassword());
    }
}
