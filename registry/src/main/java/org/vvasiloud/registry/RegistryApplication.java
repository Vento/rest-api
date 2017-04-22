package org.vvasiloud.registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Created by Aeon on 13/8/2016.
 */
@SpringBootApplication
@EnableCircuitBreaker
@EnableEurekaServer
public class RegistryApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegistryApplication.class, args);
    }
}
