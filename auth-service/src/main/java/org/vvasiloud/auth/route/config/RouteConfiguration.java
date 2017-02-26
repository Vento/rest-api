package org.vvasiloud.auth.route.config;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.service.UserServiceImpl;

/**
 * Created by Aeon on 21/2/2017.
 */

@Configuration
@EnableConfigurationProperties(EndpointProperties.class)
public class RouteConfiguration {

    @Autowired
    private EndpointProperties endpointProperties;

    @Bean
    UserServiceImpl userService() {
        return new UserServiceImpl();
    }

    @Bean
    public RouteBuilder routeBuilder(){
        final JacksonDataFormat dataFormat = new JacksonDataFormat(User.class);

        return new RouteBuilder() {
            @Override
            public void configure() throws Exception {

                onException(Exception.class)
                        .maximumRedeliveries(5)
                        .redeliveryDelay(3000)
                        .useExponentialBackOff()
                        .logRetryStackTrace(true)
                        .logStackTrace(true)
                        .logHandled(true)
                        .retryAttemptedLogLevel(LoggingLevel.WARN)
                        .retriesExhaustedLogLevel(LoggingLevel.ERROR);

                from(endpointProperties.getUserAuthUri())
                        .filter(body().isNotNull())
                        .log("Data received for unmarshalling: ${body}")
                        .unmarshal(dataFormat)
                        .choice()
                        .when(body().isInstanceOf(User.class))
                            .log("Data successfully unmarshaled to object")
                            .bean(UserServiceImpl.class, "create")
                            .log("Data sent to UserServiceImpl@create")
                        .end()
                 .log("Data operation completed");
            }
        };
    }

}
