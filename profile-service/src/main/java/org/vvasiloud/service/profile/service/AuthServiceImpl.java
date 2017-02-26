package org.vvasiloud.service.profile.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.apache.camel.ProducerTemplate;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.route.config.EndpointProperties;

import java.io.IOException;

/**
 * Created by Aeon on 21/2/2017.
 */
@Service
@EnableConfigurationProperties(EndpointProperties.class)
public class AuthServiceImpl implements AuthService{

    private final EndpointProperties endpointProperties;

    private final ProducerTemplate producerTemplate;

    private final ObjectMapper mapper;


    public AuthServiceImpl(EndpointProperties endpointProperties, ProducerTemplate producerTemplate) {
        this.endpointProperties = endpointProperties;
        this.producerTemplate = producerTemplate;
        this.mapper = new ObjectMapper();
    }

    @HystrixCommand
    @Override
    public void createUser(User user) {

        try {
            String userJson = mapper.writeValueAsString(user);
            producerTemplate.sendBody(endpointProperties.getUserAuthUri(), userJson);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
