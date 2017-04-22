package org.vvasiloud.service.match.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.vvasiloud.service.match.route.RedisConnectionFactoryProperties;

@Configuration
@EnableRedisRepositories
@EnableConfigurationProperties(RedisConnectionFactoryProperties.class)
public class RedisConfig {
/*
    @Autowired
    private RedisConnectionFactoryProperties redisConnectionFactoryProperties;

    @Bean
    RedisConnectionFactory redisConnectionFactory() throws RedisConnectionFailureException{
        final JedisConnectionFactory connectionFactory =  new JedisConnectionFactory();
        connectionFactory.setHostName(this.redisConnectionFactoryProperties.getHost());
        connectionFactory.setPort(this.redisConnectionFactoryProperties.getPort());
        return connectionFactory;
    }

    @Bean
    RedisTemplate< String, Long > redisTemplate() {
        final RedisTemplate< String, Long > template =  new RedisTemplate< String, Long >();
        template.setConnectionFactory( redisConnectionFactory() );
        return template;
    }
*/
}
