package org.vvasiloud.service.match.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

/**
 * Created by Aeon on 22/9/2016.
 */
@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // the endpoint for websocket connections
        registry.addEndpoint("/matches").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // use the /topic prefix for outgoing WebSocket communication
        config.enableSimpleBroker("/queue/", "/topic/", "/exchange/");
		//config.enableStompBrokerRelay("/queue/", "/topic/", "/exchange/");

        // use the /app prefix for others
        config.setApplicationDestinationPrefixes("/app");
    }

}
