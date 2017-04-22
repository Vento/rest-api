package org.vvasiloud.profile.controller;

import com.sun.security.auth.UserPrincipal;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.vvasiloud.service.profile.ProfileApplication;
import org.vvasiloud.service.profile.controller.ProfileController;
import org.vvasiloud.service.profile.domain.*;
import org.vvasiloud.service.profile.service.ProfileService;

import java.util.Arrays;
import java.util.Date;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    private final Logger log = LoggerFactory.getLogger(getClass());


    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(profileController).build();
    }

    private User _getStubUser(){
        final User user = new User();
        user.setUsername("testUser");
        user.setEmail("abc@test.com");
        user.setPassword("password12345");

        return user;
    }
    private Profile _getStubProfile() {

        final PointRecord pointRecord = new PointRecord();
        pointRecord.setPoint(new Point(1.001,1.002));

        final Record record = new Record();
        record.setQueue(Queue.SOLO);
        record.setDate(new Date());
        record.setPoints(Arrays.asList(pointRecord));

        final Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(1.002,1.004),new Point(2.001,2.002)));

        final Profile profile = new Profile();
        profile.setName("testuser");
        profile.setLastSeen(new Date());
        profile.setRecords(Arrays.asList(record));
        profile.setRoutes(Arrays.asList(route));

        return profile;
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

        mockMvc.perform(get("/me").principal(new UserPrincipal(profile.getName())))
                .andExpect(jsonPath("$.name").value(profile.getName()))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldSaveProfile() throws Exception {

        final Profile profile = new Profile();
        profile.setName("testProfile");
        profile.setLastSeen(new Date());
        profile.setRecords(Arrays.asList());
        profile.setRoutes(Arrays.asList());

        String profileJson = mapper.writeValueAsString(profile);
        when(profileService.saveProfile(eq(profile.getName()),any(Profile.class))).thenReturn(profile);

        mockMvc.perform(put("/me").principal(new UserPrincipal(profile.getName())).content(profileJson).contentType(contentType))
                .andExpect(jsonPath("$.name").value(profile.getName()))
                .andExpect(status().isOk());
    }

    /*@Test
    public void shouldCreateRoute() throws Exception {

        final Profile profile = new Profile();
        profile.setName("testProfile");

        final Route route = new Route();
        route.setName("testRoute");
        //route.setPoints(Arrays.asList(new Point(1.002,1.004),new Point(2.001,2.002)));

        final Profile expectedProfile = new Profile();
        expectedProfile.setName("testProfile");
        expectedProfile.setRoutes(Arrays.asList(route));

        String routeJson = mapper.writeValueAsString(route);
        when(profileService.createRoute(eq(profile.getName()),any(Route.class))).thenReturn(expectedProfile);

        mockMvc.perform(post("/me/routes").principal(new UserPrincipal(profile.getName())).contentType(contentType).content(routeJson))
                //.andExpect(jsonPath("$.name").value(profile.getName()))
                //.andExpect(jsonPath("$.._id[0]").value(route.getName()))
                .andExpect(status().isOk());
    }*/

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
