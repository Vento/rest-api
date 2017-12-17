package org.vvasiloud.service.match.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.util.List;

@Data
@EqualsAndHashCode
@NoArgsConstructor
public class RouteDto {

    private String name;
    private List<Point> points;

}
