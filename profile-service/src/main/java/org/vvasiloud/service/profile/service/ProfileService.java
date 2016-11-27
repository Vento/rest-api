package org.vvasiloud.service.profile.service;

import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;

/**
 * Created by Aeon on 14/8/2016.
 */
public interface ProfileService {

    /**
     * Gets a profile by name
     *
     * @param profileName
     * @return found profile
     */
    Profile findByName(String profileName);

    /**
     * Checks if profile with the same name already exists
     * Invokes auth-service to create a new user
     * Creates a new profile
     *
     * @param user
     * @return created profile
     */
    Profile create(User user);

    /**
     * Validates and saves profile updates
     *
     * @param name
     * @param updatedProfile
     * @return updated profile
     */
    Profile saveProfile(String name, Profile updatedProfile);

}
