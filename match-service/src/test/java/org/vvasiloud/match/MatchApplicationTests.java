package org.vvasiloud.match;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.vvasiloud.service.match.MatchApplication;

/**
 * Created by Aeon on 2/10/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MatchApplication.class)
@WebAppConfiguration
public class MatchApplicationTests {

    @Test
    public void contextLoads() {
    }
}