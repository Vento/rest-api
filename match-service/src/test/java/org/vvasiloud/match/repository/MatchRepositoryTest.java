package org.vvasiloud.match.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.test.context.junit4.SpringRunner;
import org.vvasiloud.service.match.MatchApplication;
import org.vvasiloud.service.match.domain.*;
import org.vvasiloud.service.match.repository.MatchRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by Aeon on 2/10/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MatchApplication.class)
public class MatchRepositoryTest {

    @Autowired
    private MatchRepository repository;

    private Match _getStubMatch() {

        Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(0,0),new Point(1,1)));

        User user = new User();
        user.setUsername("testuser");

        Match match = new Match();
        match.setOwner(user.getUsername());
        match.setUsers(Arrays.asList(user));
        match.setQueue(Queue.MATCH);
        match.setStatus(Status.WAITING);
        match.setName("testmatch");
        match.setRoute(route);

        return match;
    }

    @Test
    public void shouldFindMatchesByStatus() {

        Match stub = _getStubMatch();
        repository.save(stub);

        List<Match> found = repository.findAllByStatus(Status.WAITING);
        assertEquals(stub.getName(), found.get(0).getName());
    }
}
