package org.vvasiloud.service.match.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vvasiloud.service.match.domain.Location;
import org.vvasiloud.service.match.repository.LocationRepository;

import java.util.Set;

@Service
public class LocationServiceImpl implements LocationService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public Location sendLocation(Location location) {
        Location savedLocation = locationRepository.save(location);
        log.info("Location for user: " + savedLocation.getUsername() + "has been saved");
        return location;
    }

    @Override
    public Set<Location> findGeoRadiusByMember(String username){
        return locationRepository.findGeoRadiusByMember(username);
    }
}
