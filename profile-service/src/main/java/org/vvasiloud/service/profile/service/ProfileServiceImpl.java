package org.vvasiloud.service.profile.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.Record;
import org.vvasiloud.service.profile.domain.Route;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Created by Aeon on 14/8/2016.
 */
@Service
public class ProfileServiceImpl implements ProfileService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private AuthService authService;
    private ProfileRepository profileRepository;

    @Autowired
    public ProfileServiceImpl(AuthService authService, ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
        this.authService = authService;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile findByName(String profileName) {
        if (profileName.isEmpty())
            throw new IllegalArgumentException("Username empty");

        return profileRepository.findByName(profileName);
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile create(User user) {

        Profile existing = profileRepository.findByName(user.getUsername());
        Assert.isNull(existing, "profile already exists: " + user.getUsername());

        authService.createUser(user);

        Profile profile = new Profile();
        profile.setName(user.getUsername());
        profile.setLastSeen(new Date());
        profileRepository.save(profile);

        log.info("new profile has been created: " + profile.getName());

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile saveProfile(String name, Profile updatedProfile) {
        Profile profile = profileRepository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRecords(updatedProfile.getRecords());
        profile.setRoutes(updatedProfile.getRoutes());
        profile.setLastSeen(new Date());
        profileRepository.save(profile);

        log.debug("Changes saved for profile: ", name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile saveRoutes(String name, Profile updatedRoutes) {
        Profile profile = profileRepository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRoutes(updatedRoutes.getRoutes());
        profileRepository.save(profile);

        log.debug("Changes saved for profile: ", name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile saveRecords(String name, Profile updatedRecords) {
        Profile profile = profileRepository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRecords(updatedRecords.getRecords());
        profileRepository.save(profile);

        log.debug("Changes saved for profile: ", name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile createRoute(String name, Route route) {
        Profile profile = profileRepository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        List<Route> routes = profile.getRoutes();
        if (profile.getRoutes() == null) {
            routes = new ArrayList<>();
            routes.add(route);
        } else {
            routes.add(route);
        }

        profile.setRoutes(routes);
        Profile savedProfile = profileRepository.save(profile);

        log.debug("Route saved for profile: ", name);

        return savedProfile;
    }

    /**
     * {@inheritDoc}
     */
    @HystrixCommand
    @Override
    public Profile createRecord(String name, Record record) {
        Profile profile = profileRepository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        List<Record> records = profile.getRecords();
        if (records == null) {
            records = new ArrayList<>();
            records.add(record);
        } else {
            records.add(record);
        }

        profile.setRecords(records);
        Profile savedProfile = profileRepository.save(profile);

        log.debug("Record saved for profile: ", name);

        return savedProfile;
    }
}
