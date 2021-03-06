package org.vvasiloud.profile.repository;


import org.apache.tomcat.jni.Time;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.test.context.junit4.SpringRunner;
import org.vvasiloud.service.profile.ProfileApplication;
import org.vvasiloud.service.profile.domain.*;
import org.vvasiloud.service.profile.repository.ProfileRepository;

import java.util.Arrays;
import java.util.Date;

import static org.junit.Assert.assertEquals;

/**
 * Created by Aeon on 20/8/2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProfileApplication.class)
public class ProfileRepositoryTest {

    @Autowired
    private ProfileRepository repository;

    private Profile _getStubProfile() {

        PointRecord pointRecord = new PointRecord();
        pointRecord.setPoint(new Point(1.001,1.002));
        pointRecord.setTime(new Time());

        Record record = new Record();
        record.setQueue(Queue.SOLO);
        record.setDate(new Date());
        record.setTotalTime(new Time());
        record.setPoints(Arrays.asList(pointRecord));

        Route route = new Route();
        route.setName("testRoute");
        route.setPoints(Arrays.asList(new Point(1.001,1.002),new Point(2.001,2.002)));
        Profile profile = new Profile();
        profile.setName("testuser");
        profile.setLastSeen(new Date());
        profile.setRecords(Arrays.asList(record));
        profile.setRoutes(Arrays.asList(route));

        return profile;
    }

    @Test
    public void findProfileByName() {

        Profile stub = _getStubProfile();
        repository.save(stub);

        Profile found = repository.findByName(stub.getName());

        assertEquals(stub.getName(), found.getName());
        assertEquals(stub.getLastSeen(), found.getLastSeen());
    }
}
