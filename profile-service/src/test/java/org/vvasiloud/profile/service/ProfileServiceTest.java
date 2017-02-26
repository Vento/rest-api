package org.vvasiloud.profile.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;
import org.vvasiloud.service.profile.service.AuthService;
import org.vvasiloud.service.profile.service.ProfileServiceImpl;

import static junit.framework.TestCase.assertNotNull;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Aeon on 10/9/2016.
 */
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

   /* @Test
    public void shouldCreateRoute() {

        final Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(1.001,1.002),new Point(2.001,2.002)));

        Profile profile = new Profile();
        profile.setName("testUser");
        profile.setLastSeen(new Date());

        when(profileService.createRoute(profile.getName(),any(Route.class))).thenReturn(profile);
        //when(profileService.findByName(profile.getName())).thenReturn(profile);
        //when(repository.findByName(profile.getName())).thenReturn(profile);

        Profile updatedProfile = profileService.createRoute(profile.getName(),route);
        assertEquals(route.getName(), updatedProfile.getRoutes().get(0).getName());
        //assertNotNull(updatedProfile.getRoutes().get(0).getPoints());

        //verify(repository).save(profileStub);
    }
    */
}
