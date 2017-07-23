package org.vvasiloud.service.match.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
public class User {

    @NotNull
    @Length(min = 3, max = 20)
    private String username;

}
