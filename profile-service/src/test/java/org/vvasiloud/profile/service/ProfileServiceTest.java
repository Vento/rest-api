package org.vvasiloud.profile.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.test.context.junit4.SpringRunner;
import org.vvasiloud.service.profile.ProfileApplication;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.Route;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;
import org.vvasiloud.service.profile.service.AuthService;
import org.vvasiloud.service.profile.service.ProfileServiceImpl;

import java.util.Arrays;
import java.util.Date;

import static junit.framework.TestCase.assertNotNull;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Aeon on 10/9/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProfileApplication.class)
public class ProfileServiceTest {

    @InjectMocks
    private ProfileServiceImpl profileService;

    @Mock
    private ProfileRepository repository;

    @Mock
    private AuthService authService;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void findByName() {

        final Profile profile = new Profile();
        profile.setName("testUser");

        when(profileService.findByName(profile.getName())).thenReturn(profile);
        Profile returned = profileService.findByName(profile.getName());

        assertEquals(profile, returned);
    }


    @Test
    public void shouldCreateProfileWithUser() {
        final User user = new User();
        user.setUsername("testUser");
        user.setEmail("abc@test.com");
        user.setPassword("password");

        Profile createdProfile = profileService.create(user);
        assertEquals(user.getUsername(), createdProfile.getName());
        assertNotNull(createdProfile.getLastSeen());

        verify(authService).createUser(user);
        verify(repository).save(createdProfile);
    }

    @Test
    public void shouldSaveRoutes() {

        final Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(1.001,1.002),new Point(2.001,2.002)));

        final Profile profile = new Profile();
        profile.setName("testUser");
        profile.setLastSeen(new Date());

        final Profile expectedProfile = new Profile();
        expectedProfile.setName("testUser");
        expectedProfile.setRoutes(Arrays.asList(route));

        when(profileService.findByName(profile.getName())).thenReturn(profile);

        final Profile updatedProfile = profileService.saveRoutes(profile.getName(),expectedProfile);
        assertEquals(expectedProfile.getName(), updatedProfile.getName());
        assertEquals(expectedProfile.getRoutes().get(0).getName(), updatedProfile.getRoutes().get(0).getName());

        verify(repository).save(updatedProfile);
    }

    /*@Test
    public void shouldCreateRoute() {

        final Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(1.001,1.002),new Point(2.001,2.002)));

        final Profile profile = new Profile();
        profile.setName("testUser");
        profile.setLastSeen(new Date());

        when(profileService.findByName(profile.getName())).thenReturn(profile);

        Profile updatedProfile = profileService.createRoute(profile.getName(),route);
        assertEquals(updatedProfile.getName(), profile.getName());
        assertEquals(updatedProfile.getRoutes().get(0).getName(), route.getName());

        verify(repository).save(updatedProfile);
    }*/

}
