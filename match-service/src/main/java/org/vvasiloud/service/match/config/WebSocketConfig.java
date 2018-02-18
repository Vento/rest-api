package org.vvasiloud.service.match.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.DefaultUserDestinationResolver;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.messaging.simp.user.UserDestinationResolver;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.messaging.*;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.standard.TomcatRequestUpgradeStrategy;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.vvasiloud.service.match.route.RabbitMQConnectionFactoryProperties;
import org.vvasiloud.service.match.route.RedisConnectionFactoryProperties;

import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 * Created by Aeon on 22/9/2016.
 */
@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
@EnableConfigurationProperties(RabbitMQConnectionFactoryProperties.class)
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    //@Value("${spring.redis.host}") private String relayHost;
    //@Value("${spring.redis.port}") private int relayPort;

    @Autowired
    private RedisConnectionFactoryProperties connectionFactoryProperties;

    private AuthorizationServerEndpointsConfiguration configuration;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // the endpoint for websocket connections
        registry
                .addEndpoint("/ws")
                .setAllowedOrigins("*")
                .setHandshakeHandler(new DefaultHandshakeHandler(new TomcatRequestUpgradeStrategy()))
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // use the /topic prefix for outgoing WebSocket communication
        config.enableSimpleBroker("/queue/", "/topic/", "/exchange/");
/*        config.enableStompBrokerRelay("/queue/", "/topic/", "/exchange/")
                .setRelayHost(this.connectionFactoryProperties.getHost())
                .setRelayPort(this.connectionFactoryProperties.getPort());*/

        // use the /app prefix for others
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.setInterceptors(new ChannelInterceptorAdapter() {

            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {

                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                List tokenList = accessor.getNativeHeader("Authorization");
                accessor.removeNativeHeader("Authorization");

                String token = null;
                if (tokenList != null && !tokenList.isEmpty()) {
                    token = tokenList.get(0).toString();
                }

                //OAuth2AccessToken authToken = new OAuth2AccessToken(token);
                //SecurityContextHolder.getContext().setAuthentication(authToken);

                switch (accessor.getCommand()) {
                    case CONNECT:
                        //Principal user = (token == null) ? null : authToken;
                        //accessor.setUser(user);

                        return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
                    case CONNECTED:
                        System.out.println("Stomp connected");
                        break;
                    case DISCONNECT:
                        System.out.println("Stomp disconnected");
                        break;
                    case SEND:
                        break;
                    default:
                        break;
                }

                return message;
            }
        });
    }

}
