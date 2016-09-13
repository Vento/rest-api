package org.vvasiloud.service.profile.controller;

import com.netflix.hystrix.exception.HystrixRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.service.ProfileService;

import javax.validation.Valid;

/**
 * Created by Aeon on 14/8/2016.
 */
@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(HystrixRuntimeException.class)
    public String handleBadRequest(Exception ex) {
        return ex.getMessage();
    }

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    public Profile getProfileByName(@PathVariable String name) {
        return profileService.findByName(name);
    }

    @RequestMapping(path = "/{name}", method = RequestMethod.PUT)
    public void saveProfile(@PathVariable String name,@Valid @RequestBody Profile profile) {
        profileService.saveProfile(name, profile);
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public Profile createNewAccount(@Valid @RequestBody User user) {
        return profileService.create(user);
    }
}
