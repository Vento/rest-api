package org.vvasiloud.service.match.event;

import java.util.Date;

/**
 * Created by Aeon on 13/11/2016.
 */
public class JoinEvent {
    private String username;
    private Date time;
    private String matchId;

    public JoinEvent(String username, String matchId) {
        this.username = username;
        this.matchId = matchId;
        time = new Date();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
