package org.vvasiloud.auth.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.vvasiloud.auth.domain.User;

/**
 * Created by Aeon on 19/8/2016.
 */
@Repository
public interface UserRepository extends CrudRepository<User, String> {}
