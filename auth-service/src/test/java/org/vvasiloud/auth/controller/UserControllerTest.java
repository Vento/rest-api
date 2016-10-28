package org.vvasiloud.auth.controller;

import com.sun.security.auth.UserPrincipal;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.vvasiloud.auth.AuthServiceApplication;
import org.vvasiloud.auth.domain.User;
import org.vvasiloud.auth.service.UserService;

import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Aeon on 27/8/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthServiceApplication.class)
@WebAppConfiguration
public class UserControllerTest {

    private static final ObjectMapper mapper = new ObjectMapper();

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void createNewUser() throws Exception {

        final User user = new User();
        user.setUsername("Username");
        user.setPassword("Password");

        String json = mapper.writeValueAsString(user);

        mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }

    @Test
    public void userIsNotValid() throws Exception {

        final User user = new User();
        user.setUsername("null");
        user.setPassword("null");

        mockMvc.perform(post("/users")).andExpect(status().isBadRequest());
    }

    @Test
    public void returnCurrentUser() throws Exception {
        mockMvc.perform(get("/users/current").principal(new UserPrincipal("Username")))
                .andExpect(jsonPath("$.name").value("Username"))
                .andExpect(status().isOk());
    }
}
