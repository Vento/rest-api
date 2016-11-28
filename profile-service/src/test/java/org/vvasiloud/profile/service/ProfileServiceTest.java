package org.vvasiloud.profile.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.vvasiloud.service.profile.client.AuthServiceClient;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.domain.User;
import org.vvasiloud.service.profile.repository.ProfileRepository;
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
    private AuthServiceClient authServiceClient;

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

        verify(authServiceClient).createUser(user);
        verify(repository).save(createdProfile);
    }
}
