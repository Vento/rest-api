package org.vvasiloud.auth.route.config;

import com.rabbitmq.client.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Aeon on 22/2/2017.
 */
@Configuration
@EnableConfigurationProperties(RabbitMQConnectionFactoryProperties.class)
public class RouteConnectionConfiguration {

    @Autowired
    private RabbitMQConnectionFactoryProperties rabbitMQConnectionFactoryProperties;

    @Bean
    public ConnectionFactory customConnectionFactory() {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost(rabbitMQConnectionFactoryProperties.getHost());
        connectionFactory.setPort(rabbitMQConnectionFactoryProperties.getPort());
        connectionFactory.setUsername(rabbitMQConnectionFactoryProperties.getUsername());
        connectionFactory.setPassword(rabbitMQConnectionFactoryProperties.getPassword());

        return connectionFactory;
    }
}
