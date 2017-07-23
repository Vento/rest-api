package org.vvasiloud.service.match.dto;

import lombok.Data;
import org.springframework.data.geo.Point;

@Data
public class LocationDto {

    private String username;
    private Point position;
}
