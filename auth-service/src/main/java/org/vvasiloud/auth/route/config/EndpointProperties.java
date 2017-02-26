package org.vvasiloud.auth.route.config;

/**
 * Created by Aeon on 21/2/2017.
 */

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Camel routes endpoint properties
 */
@ConfigurationProperties(prefix = "camel.endpoint.auth")
public class EndpointProperties {

    private String userProfileUri;

    private String userAuthUri;

    public String getUserProfileUri() {
        return userProfileUri;
    }

    public void setUserProfileUri(String userProfileUri) {
        this.userProfileUri = userProfileUri;
    }

    public String getUserAuthUri() {
        return userAuthUri;
    }

    public void setUserAuthUri(String userAuthUri) {
        this.userAuthUri = userAuthUri;
    }
}
