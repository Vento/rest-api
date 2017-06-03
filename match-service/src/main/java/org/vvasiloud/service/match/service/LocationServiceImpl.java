package org.vvasiloud.service.match.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands.GeoLocation;
import org.springframework.stereotype.Service;
import org.vvasiloud.service.match.domain.Location;
import org.vvasiloud.service.match.repository.LocationRepository;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public Location save(Location location) {
        Location savedLocation = locationRepository.save(location);
        return savedLocation;
    }

    @Override
    public GeoResults<GeoLocation<String>> findGeoRadiusByMember(String username) {
        return locationRepository.findGeoRadiusByMember(username);
    }

    @Override
    public Iterable<Location> findAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location findByUsername(String username) {
        return locationRepository.findByUsername(username);
    }

    @Override
    public List<Location> findByUsernameNear(String username){
        Location foundLocation = locationRepository.findByUsername(username);
        return locationRepository.findByPositionNear(foundLocation.getPosition(), new Distance(100));
    }

}
