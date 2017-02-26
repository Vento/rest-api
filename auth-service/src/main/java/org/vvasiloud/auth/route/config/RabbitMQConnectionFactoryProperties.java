package org.vvasiloud.auth.route.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by Aeon on 22/2/2017.
 */
@ConfigurationProperties(prefix = "camel.connection.rabbitmq")
public class RabbitMQConnectionFactoryProperties {

    private String host;

    private int port;

    private String username;

    private String password;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}