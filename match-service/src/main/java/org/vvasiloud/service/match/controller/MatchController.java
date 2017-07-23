package org.vvasiloud.service.match.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;
import org.vvasiloud.service.match.domain.Location;
import org.vvasiloud.service.match.service.LocationService;

import java.security.Principal;
import java.util.List;


@RestController
public class MatchController {

    private LocationService locationService;

    @Autowired
    public MatchController(LocationService locationService) {
        this.locationService = locationService;
    }

    @MessageMapping("/track")
    @SendTo("/topic/locations")
    public Location sendLocation(Point position, Principal principal) throws Exception {
        Location location = new Location(principal.getName(), position);
        return locationService.save(location);
    }

    @SubscribeMapping("/around/me")
    public List<Location> getClosestLocations(Principal principal) throws Exception {
        return locationService.findByUsernameNear(principal.getName());
    }

    @GetMapping(path = "/around/{username}")
    public List<Location> getClosestLocationsByUsername(@PathVariable String username) throws Exception {
        return locationService.findByUsernameNear(username);
    }

    /*@GetMapping(path = "/aroundByMember/{username}")
    public GeoResults<GeoLocation<String>> getClosestLocationsByUsernameByRadius(@PathVariable String username) throws Exception {
        GeoResults<GeoLocation<String>> locationCollection = locationService.findGeoRadiusByMember(username);
        return locationCollection;
    }*/

    @GetMapping(path = "/location/me")
    public Location getOwnLocation(Principal principal) throws Exception {
        return locationService.findByUsername(principal.getName());
    }

    @GetMapping(path = "/location/{username}")
    public Location getLocationByUsername(@PathVariable String username) throws Exception {

        Location location = new Location(username, new Point(12.456,34.756));
        locationService.save(location);

        return locationService.findByUsername(username);
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}
