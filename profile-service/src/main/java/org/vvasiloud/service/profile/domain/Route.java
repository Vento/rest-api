package org.vvasiloud.service.profile.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;

import javax.validation.constraints.NotNull;
import java.util.List;

public class Route {

    @Id
    private String name;

    @NotNull
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
