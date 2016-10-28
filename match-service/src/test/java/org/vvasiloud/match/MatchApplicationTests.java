package org.vvasiloud.match;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.vvasiloud.service.match.MatchApplication;

/**
 * Created by Aeon on 2/10/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MatchApplication.class)
@WebAppConfiguration
public class MatchApplicationTests {

    @Test
    public void contextLoads() {
    }
}