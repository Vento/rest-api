package org.vvasiloud.service.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.service.ProfileService;

import javax.validation.Valid;
import java.security.Principal;

/**
 * Created by Aeon on 14/8/2016.
 */
@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    /*@ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(HystrixRuntimeException.class)
    public String handleBadRequest(Exception ex) {
        return ex.getMessage();
    }*/

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    public ResponseEntity<Profile> getProfileByName(@PathVariable String name) {
        Profile profile = profileService.findByName(name);
        if(profile == null){
            return new ResponseEntity<>(profile,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(path = "/current", method = RequestMethod.GET)
    public ResponseEntity<Profile> getCurrentProfile(Principal principal) {
        Profile profile = profileService.findByName(principal.getName());
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(path = "/current", method = RequestMethod.PUT)
    public ResponseEntity<Profile> saveProfile(Principal principal,@Valid @RequestBody Profile profile) {
        String name = principal.getName();
        Profile updatedProfile = profileService.saveProfile(name, profile);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public ResponseEntity<Profile> createProfile(@Valid @RequestBody User user,UriComponentsBuilder ucBuilder) {
        Profile createdProfile = profileService.create(user);

        if (createdProfile == null) {
            System.out.println("Profile already exist");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/{name}").buildAndExpand(createdProfile.getName()).toUri());
        return new ResponseEntity<>(createdProfile , headers, HttpStatus.CREATED);
    }
}
