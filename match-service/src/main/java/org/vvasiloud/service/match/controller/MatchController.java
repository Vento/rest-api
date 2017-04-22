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
import java.util.Set;


/**
 * Created by Aeon on 22/9/2016.
 */
@RestController
public class MatchController {

    private final Logger log = LoggerFactory.getLogger(getClass());


    @Autowired
    private LocationService locationService;

    @MessageMapping("/track")
    @SendTo("/topic/locations")
    public Location sendLocation(Point position, Principal principal) throws Exception {
        Location location = new Location(principal.getName(), position);
        return locationService.sendLocation(location);
    }

    @SubscribeMapping("/locations")
    public Set<Location> getClosestLocations(Principal principal) throws Exception {
        Set<Location> locationCollection = locationService.findGeoRadiusByMember(principal.getName());
        return locationCollection;
    }

    @RequestMapping(path = "locations1/{username}", method = RequestMethod.GET)
    public Set<Location> getClosestLocations1(@PathVariable String username) throws Exception {
        Set<Location> locationCollection = locationService.findGeoRadiusByMember(username);
        return locationCollection;
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}
