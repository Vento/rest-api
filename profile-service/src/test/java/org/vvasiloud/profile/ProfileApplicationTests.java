package org.vvasiloud.profile;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.vvasiloud.service.profile.ProfileApplication;

/**
 * Created by Aeon on 20/8/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProfileApplication.class)
@WebAppConfiguration
public class ProfileApplicationTests {

    @Test
    public void contextLoads() {

    }

}
