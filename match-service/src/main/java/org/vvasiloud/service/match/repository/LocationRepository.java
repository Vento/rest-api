package org.vvasiloud.service.match.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.vvasiloud.service.match.domain.Location;

import java.util.Set;

@Repository
public interface LocationRepository extends CrudRepository<Location, String> {
    Set<Location> findGeoRadiusByMember(String username);
}
