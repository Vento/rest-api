package org.vvasiloud.auth.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.repository.UserRepository;

/**
 * Created by Aeon on 22/8/2016.
 */

@Service
public class AuthUserDetailsService implements UserDetailsService {

    private static final Logger log  = LoggerFactory.getLogger(AuthUserDetailsService.class);

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findOne(username);

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        log.debug(" User from username " + user.toString());
        return user;
    }


}
