package org.vvasiloud.profile.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.vvasiloud.service.profile.ProfileApplication;
import org.vvasiloud.service.profile.controller.ProfileController;
import org.vvasiloud.service.profile.domain.Profile;
import org.vvasiloud.service.profile.service.ProfileService;

import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Aeon on 10/9/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ProfileApplication.class)
@WebAppConfiguration
public class ProfileControllerTest {


    @InjectMocks
    private ProfileController profileController;

    @Mock
    private ProfileService profileService;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(profileController).build();
    }

    @Test
    public void getProfileByName() throws Exception {

        final Profile profile = new Profile();
        profile.setName("testuser");

        when(profileService.findByName(profile.getName())).thenReturn(profile);

        mockMvc.perform(get("/" + profile.getName()))
                .andExpect(jsonPath("$.name").value(profile.getName()))
                .andExpect(status().isOk());
    }

}
