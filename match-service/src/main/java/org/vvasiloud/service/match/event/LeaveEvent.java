package org.vvasiloud.service.match.event;

/**
 * Created by Aeon on 13/11/2016.
 */
public class LeaveEvent {
    private String username;

    public LeaveEvent(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}