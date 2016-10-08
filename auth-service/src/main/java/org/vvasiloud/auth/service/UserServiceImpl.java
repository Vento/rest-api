package org.vvasiloud.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.repository.UserRepository;

/**
 * Created by Aeon on 19/8/2016.
 */
@Service
public class UserServiceImpl implements UserService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository repository;

    @Override
    public void create(User user) {

        User loadedUser = repository.findOne(user.getUsername());

        if(loadedUser != null){
            throw new IllegalArgumentException("User already exists: " + user.getUsername());
        }

        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);

        repository.save(user);
        log.info("User created successfully: ", user.getUsername());
    }
}
