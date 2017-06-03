package org.vvasiloud.service.match.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.GeoIndexed;
import org.springframework.data.redis.core.index.Indexed;

@Data
@EqualsAndHashCode(exclude = {"position"})
@NoArgsConstructor
@RedisHash("locations")
public class Location {

    @Id
    @Indexed
    private String username;

    @GeoIndexed
    private Point position = new Point(0.00,0.00);

    public Location(String username, Point position) {
        this.username = username;
        this.position = position;
    }

    @TimeToLive
    public long getTimeToLive() {
        return Long.valueOf(3600);
    }
}
