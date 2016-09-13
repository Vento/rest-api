package org.vvasiloud.service.profile.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.vvasiloud.service.profile.client.AuthServiceClient;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;

import java.util.Date;

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
    public void saveProfile(String name, Profile updatedProfile) {
        Profile profile = repository.findByName(name);
        Assert.notNull(profile, "Cannot find profile with name: " + name);

        profile.setRecords(updatedProfile.getRecords());
        profile.setRoutes(updatedProfile.getRoutes());
        profile.setLastSeen(new Date());
        repository.save(profile);

        log.debug("Changes saved for profile: "+ name);
    }


}
