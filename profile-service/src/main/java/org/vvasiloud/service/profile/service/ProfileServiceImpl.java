package org.vvasiloud.service.profile.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.vvasiloud.service.profile.client.AuthServiceClient;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.Record;
import org.vvasiloud.service.profile.domain.Route;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Aeon on 14/8/2016.
 */
@Service
public class ProfileServiceImpl implements ProfileService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private AuthServiceClient authClient;

    @Autowired
    private ProfileRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile findByName(String profileName) {
        Assert.hasLength(profileName);
        return repository.findByName(profileName);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile create(User user) {

        Profile existing = repository.findByName(user.getUsername());
        Assert.isNull(existing, "profile already exists: " + user.getUsername());

        authClient.createUser(user);

        Profile profile = new Profile();
        profile.setName(user.getUsername());
        profile.setLastSeen(new Date());
        repository.save(profile);

        log.info("new profile has been created: " + profile.getName());

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile saveProfile(String name, Profile updatedProfile) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRecords(updatedProfile.getRecords());
        profile.setRoutes(updatedProfile.getRoutes());
        profile.setLastSeen(new Date());
        repository.save(profile);

        log.debug("Changes saved for profile: "+ name);

        return profile;
    }
	
    /**
     * {@inheritDoc}
     */
    @Override
    public Profile saveRoutes(String name, Profile updatedRoutes) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRoutes(updatedRoutes.getRoutes());
        repository.save(profile);

        log.debug("Changes saved for profile: "+ name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile saveRecords(String name, Profile updatedRecords) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRecords(updatedRecords.getRecords());
        repository.save(profile);

        log.debug("Changes saved for profile: "+ name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile createRoute(String name, Route route) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        List<Route> routes = profile.getRoutes();
        routes.add(route);

        profile.setRoutes(routes);
        repository.save(profile);

        log.debug("Route saved for profile: "+ name);

        return profile;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Profile createRecord(String name, Record record) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        List<Record> records = profile.getRecords();
        records.add(record);

        profile.setRecords(records);
        repository.save(profile);

        log.debug("Record saved for profile: "+ name);

        return profile;
    }
}
