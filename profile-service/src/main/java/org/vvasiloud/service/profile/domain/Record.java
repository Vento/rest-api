package org.vvasiloud.service.profile.domain;

import org.apache.tomcat.jni.Time;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Aeon on 10/9/2016.
 */
public class Record {

    @NotNull
    private Queue queue;

    @NotNull
    private Date date;

    @NotNull
    private Time totalTime;

    @Valid
    private List<PointRecord> points;

    public Queue getQueue() {
        return queue;
    }

    public void setQueue(Queue queue) {
        this.queue = queue;
    }

    public List<PointRecord> getPoints() {
        return points;
    }

    public void setPoints(List<PointRecord> points) {
        this.points = points;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Time totalTime) {
        this.totalTime = totalTime;
    }
}
