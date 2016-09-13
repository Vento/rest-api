package org.vvasiloud.auth.service;

import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.exception.UserAlreadyExistsException;

/**
 * Created by Aeon on 19/8/2016.
 */
public interface UserService {

    void create(User user) throws UserAlreadyExistsException;

}