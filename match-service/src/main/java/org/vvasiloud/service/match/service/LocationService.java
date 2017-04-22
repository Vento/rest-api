package org.vvasiloud.service.match.service;

import org.vvasiloud.service.match.domain.Location;

import java.util.Set;

/**
 * Created by Aeon on 9/4/2017.
 */
public interface LocationService {

    Location sendLocation(Location location);

    Set<Location> findGeoRadiusByMember(String username);
}
