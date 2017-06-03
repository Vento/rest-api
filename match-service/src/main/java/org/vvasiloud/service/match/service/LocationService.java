package org.vvasiloud.service.match.service;

import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.vvasiloud.service.match.domain.Location;

import java.util.List;

/**
 * Created by Aeon on 9/4/2017.
 */
public interface LocationService {

    Location save(Location location);

    GeoResults<RedisGeoCommands.GeoLocation<String>> findGeoRadiusByMember(String username);

    Iterable<Location> findAll();

    Location findByUsername(String username);

    List<Location> findByUsernameNear(String username);

}
