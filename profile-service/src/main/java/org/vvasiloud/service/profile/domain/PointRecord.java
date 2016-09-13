package org.vvasiloud.service.profile.domain;

import org.apache.tomcat.jni.Time;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;

import javax.validation.constraints.NotNull;

/**
 * Created by Aeon on 10/9/2016.
 */
public class PointRecord {

    @Id
    private Point point;

    @NotNull
    private Time time;

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
