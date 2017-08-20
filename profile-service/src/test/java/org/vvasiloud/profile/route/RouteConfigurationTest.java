//package org.vvasiloud.profile.route;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.camel.EndpointInject;
//import org.apache.camel.ProducerTemplate;
//import org.apache.camel.component.mock.MockEndpoint;
//import org.apache.camel.spring.boot.CamelAutoConfiguration;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Import;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.vvasiloud.service.profile.domain.User;
//import org.vvasiloud.service.profile.route.config.RouteConfiguration;
//import org.vvasiloud.service.profile.service.AuthService;
//
//import java.util.concurrent.TimeUnit;
//
//
///**
// * Created by Aeon on 27/2/2017.
// */
//@RunWith(SpringRunner.class)
//@ContextConfiguration(classes = {
//        CamelAutoConfiguration.class,
//})
//public class RouteConfigurationTest {
//
//    @Mock
//    private AuthService authService;
//
//    private ObjectMapper mapper = new ObjectMapper();
//
//    @EndpointInject(uri = "mock:vento.service.profile")
//    private ProducerTemplate producerTemplate;
//
//    @EndpointInject(uri = "mock:vento.service.auth")
//    private MockEndpoint mockEndpoint;
//
//    @Configuration
//    @Import({RouteConfiguration.class})
//    static class TestConfiguration {}
//
//    @Test
//    public void shouldSendUserToAuthRouteConfigurationTest() throws Exception {
//
//        final User user = new User();
//        user.setUsername("routeTestUser");
//        user.setPassword("123456789");
//        user.setEmail("test@test.com");
//
//        String userMessage = mapper.writeValueAsString(user);
//
//        producerTemplate.sendBody(userMessage.getBytes());
//
//        mockEndpoint.expectedMessageCount(1);
//        mockEndpoint.await(5L, TimeUnit.SECONDS);
//    }
//}
