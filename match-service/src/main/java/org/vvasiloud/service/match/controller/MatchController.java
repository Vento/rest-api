package org.vvasiloud.service.match.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.vvasiloud.service.match.domain.Location;
import org.vvasiloud.service.match.service.LocationService;

import java.security.Principal;
import java.util.List;


@RestController
public class MatchController {

    private final Logger log = LoggerFactory.getLogger(getClass());


    @Autowired
    private LocationService locationService;

    @MessageMapping("/track")
    @SendTo("/topic/locations")
    public Location sendLocation(Point position, Principal principal) throws Exception {
        Location location = new Location(principal.getName(), position);
        return locationService.save(location);
    }

    @SubscribeMapping("/around/me")
    public List<Location> getClosestLocations(Principal principal) throws Exception {
        List<Location> locationCollection = locationService.findByUsernameNear(principal.getName());
        return locationCollection;
    }

    @RequestMapping(path = "/around/{username}", method = RequestMethod.GET)
    public List<Location> getClosestLocationsByUsername(@PathVariable String username) throws Exception {
        List<Location> locationCollection = locationService.findByUsernameNear(username);
        return locationCollection;
    }

    /*@RequestMapping(path = "/aroundByMember/{username}", method = RequestMethod.GET)
    public GeoResults<GeoLocation<String>> getClosestLocationsByUsernameByRadius(@PathVariable String username) throws Exception {
        GeoResults<GeoLocation<String>> locationCollection = locationService.findGeoRadiusByMember(username);
        return locationCollection;
    }*/

    @RequestMapping(path = "/location/me", method = RequestMethod.GET)
    public Location getOwnLocation(Principal principal) throws Exception {
        Location returnedLocation = locationService.findByUsername(principal.getName());
        return returnedLocation;
    }

    @RequestMapping(path = "/location/{username}", method = RequestMethod.GET)
    public Location getLocationByUsername(@PathVariable String username) throws Exception {

        Location location = new Location(username, new Point(12.456,34.756));
        locationService.save(location);

        Location returnedLocation = locationService.findByUsername(username);
        return returnedLocation;
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}
