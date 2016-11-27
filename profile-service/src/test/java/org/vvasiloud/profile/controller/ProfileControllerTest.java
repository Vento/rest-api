package org.vvasiloud.profile.controller;

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
import org.vvasiloud.service.profile.ProfileApplication;
import org.vvasiloud.service.profile.controller.ProfileController;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.service.ProfileService;

import java.util.Date;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Aeon on 10/9/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProfileApplication.class)
@WebAppConfiguration
public class ProfileControllerTest {

    @InjectMocks
    private ProfileController profileController;

    @Mock
    private ProfileService profileService;

    private MockMvc mockMvc;

    private static final ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = MediaType.APPLICATION_JSON;

    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(profileController).build();
    }

    @Test
    public void shouldGetProfileByName() throws Exception {

        final Profile profile = new Profile();
        profile.setName("testuser");

        when(profileService.findByName(profile.getName())).thenReturn(profile);

        mockMvc.perform(get("/" + profile.getName()))
                .andExpect(jsonPath("$.name").value(profile.getName()))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldGetCurrentProfile() throws Exception {

        final Profile profile = new Profile();
        profile.setName("testProfile");

        when(profileService.findByName(profile.getName())).thenReturn(profile);

        mockMvc.perform(get("/current").principal(new UserPrincipal(profile.getName())))
                .andExpect(jsonPath("$.name").value(profile.getName()))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldCreateNewProfile() throws Exception {

        final User user = new User();
        user.setUsername("testUser");
        user.setEmail("abc@test.com");
        user.setPassword("password12345");

        final Profile profile = new Profile();
        profile.setName("testUser");
        profile.setLastSeen(new Date());

        String userJson = mapper.writeValueAsString(user);
        when(profileService.create(user)).thenReturn(profile);

        System.out.println("Valid json " + userJson);

        when(profileService.create(any(User.class))).thenReturn(profile); //Avoid overriding hashcode/equal in the User class
        //when(profileService.create(user)).thenReturn(profile);

        mockMvc.perform(post("/").contentType(contentType).content(userJson))
                .andExpect(jsonPath("$.name").value(user.getUsername()))
                .andExpect(status().isCreated());

    }

    @Test
    public void shouldNotCreateNewProfileWithInvalidArguments() throws Exception {

        final User user = new User();
        user.setUsername("testUser");

        String userJson = mapper.writeValueAsString(user);

        System.out.println("Invalid arguments json " + userJson);

        mockMvc.perform(post("/").contentType(contentType).content(userJson))
                .andExpect(status().isBadRequest());
    }

}
