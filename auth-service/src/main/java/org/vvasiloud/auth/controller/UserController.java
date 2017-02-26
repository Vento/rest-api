package org.vvasiloud.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.service.UserService;

import javax.validation.Valid;
import java.security.Principal;

/**
 * Created by Aeon on 19/8/2016.
 */

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public Principal getUser(Principal principal) {
        return principal;
    }

    //@PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(method = RequestMethod.POST)
    public void createUser(@Valid @RequestBody User user) {
        userService.create(user);
    }
}
