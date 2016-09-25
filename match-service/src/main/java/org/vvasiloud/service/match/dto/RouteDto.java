package org.vvasiloud.service.match.dto;

import org.springframework.data.geo.Point;

import java.util.List;

/**
 * Created by Aeon on 25/9/2016.
 */
public class RouteDto {

    private String name;
    private List<Point> points;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
