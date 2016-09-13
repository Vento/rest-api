package org.vvasiloud.service.profile.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.vvasiloud.service.profile.domain.Profile;

/**
 * Created by Aeon on 14/8/2016.
 */
@Repository
public interface ProfileRepository extends CrudRepository<Profile, String> {

    Profile findByName(String name);

}
