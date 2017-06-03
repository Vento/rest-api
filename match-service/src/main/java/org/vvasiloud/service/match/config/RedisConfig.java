package org.vvasiloud.service.match.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.vvasiloud.service.match.route.RedisConnectionFactoryProperties;

@Configuration
@EnableRedisRepositories
@EnableConfigurationProperties(RedisConnectionFactoryProperties.class)
public class RedisConfig {

    @Autowired
    private RedisConnectionFactoryProperties redisConnectionFactoryProperties;

    @Bean
    JedisConnectionFactory redisConnectionFactory() throws RedisConnectionFailureException {

        final JedisConnectionFactory connectionFactory =  new JedisConnectionFactory();
        connectionFactory.setHostName(this.redisConnectionFactoryProperties.getHost());
        connectionFactory.setPort(this.redisConnectionFactoryProperties.getPort());

        return connectionFactory;
    }

    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<byte[], byte[]> template = new RedisTemplate<byte[], byte[]>();
        template.setDefaultSerializer(new JdkSerializationRedisSerializer());
        template.setKeySerializer(new StringRedisSerializer());
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }

}
