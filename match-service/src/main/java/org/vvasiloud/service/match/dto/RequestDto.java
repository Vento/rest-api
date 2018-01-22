package org.vvasiloud.service.match.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"route"})
@NoArgsConstructor
public class RequestDto {

    private String username;
    private RouteDto route;
}
