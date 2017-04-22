package org.vvasiloud.service.match.dto;

import org.springframework.data.geo.Point;

public class LocationDto {

    private String username;
    private Point position;

    public LocationDto(String username, Point position) {
        this.username = username;
        this.position = position;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }
}
