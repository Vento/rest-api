package org.vvasiloud.service.profile.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.vvasiloud.service.profile.domain.User;

/**
 * Created by Aeon on 14/8/2016.
 */
@FeignClient("auth-service")
public interface AuthServiceClient {

    @RequestMapping(method = RequestMethod.POST, value = "/uaa/users", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    void createUser(User user);

}
