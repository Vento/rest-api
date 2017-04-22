package org.vvasiloud.service.match.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.vvasiloud.service.match.route.RabbitMQConnectionFactoryProperties;

/**
 * Created by Aeon on 22/9/2016.
 */
@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
@EnableConfigurationProperties(RabbitMQConnectionFactoryProperties.class)
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    //@Value("${spring.redis.host}") private String relayHost;
    //@Value("${spring.redis.port}") private int relayPort;

    @Autowired
    private RabbitMQConnectionFactoryProperties connectionFactoryProperties;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // the endpoint for websocket connections
        registry
                .addEndpoint("/ws")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // use the /topic prefix for outgoing WebSocket communication
        //config.enableSimpleBroker("/queue/", "/topic/", "/exchange/");
		config.enableStompBrokerRelay("/queue/", "/topic/", "/exchange/")
                .setRelayHost(this.connectionFactoryProperties.getHost())
				.setRelayPort(61613)
                .setClientLogin(this.connectionFactoryProperties.getUsername())
                .setClientPasscode(this.connectionFactoryProperties.getPassword());

        // use the /app prefix for others
        config.setApplicationDestinationPrefixes("/app");
    }

}
