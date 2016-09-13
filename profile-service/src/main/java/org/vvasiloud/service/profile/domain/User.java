package org.vvasiloud.service.profile.domain;

import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotNull;

/**
 * Created by Aeon on 14/8/2016.
 */
public class User {

    @NotNull
    @Length(min = 3, max = 20)
    private String username;

    @NotNull
    @Length(min = 8, max = 40)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
