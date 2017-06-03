package org.vvasiloud.service.match.repository;

import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.vvasiloud.service.match.domain.Location;

import java.util.List;

@Repository
public interface LocationRepository extends CrudRepository<Location, String>, CustomRedisRepository {

    //Set<Location> findGeoRadiusByMember(String username);

    Iterable<Location> findAll();

    Location findByUsername(String username);

    Location findByPositionWithin(Circle circle);

    List<Location> findByPositionNear(Point position, Distance distance);

}
