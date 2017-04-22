package org.vvasiloud.service.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.Record;
import org.vvasiloud.service.profile.domain.Route;
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

    @RequestMapping(path = "/me", method = RequestMethod.GET)
    public ResponseEntity<Profile> getCurrentProfile(Principal principal) {
        Profile profile = profileService.findByName(principal.getName());
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(path = "/me", method = RequestMethod.PUT)
    public ResponseEntity<Profile> saveProfile(Principal principal,@Valid @RequestBody Profile profile) {
        Profile updatedProfile = profileService.saveProfile(principal.getName(), profile);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }

    @RequestMapping(path = "/me/routes", method = RequestMethod.POST)
    public ResponseEntity<Profile> createRoute(Principal principal,@Valid @RequestBody Route route) {
        Profile updatedProfile = profileService.createRoute(principal.getName(), route);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }

    @RequestMapping(path = "/me/records", method = RequestMethod.POST)
    public ResponseEntity<Profile> createRecord(Principal principal,@Valid @RequestBody Record record) {
        Profile updatedProfile = profileService.createRecord(principal.getName(), record);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }
    @RequestMapping(path = "/me/routes", method = RequestMethod.PUT)
    public ResponseEntity<Profile> saveRoutes(Principal principal,@Valid @RequestBody Profile profile) {
        Profile updatedProfile = profileService.saveRoutes(principal.getName(), profile);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }

    @RequestMapping(path = "/me/records", method = RequestMethod.PUT)
    public ResponseEntity<Profile> saveRecords(Principal principal,@Valid @RequestBody Profile profile) {
        String name = principal.getName();
        Profile updatedProfile = profileService.saveRecords(name, profile);
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
