package org.vvasiloud.service.match.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.vvasiloud.service.match.domain.*;
import org.vvasiloud.service.match.repository.MatchRepository;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Aeon on 22/9/2016.
 */
@Service
public class MatchServiceImpl implements MatchService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    //@Autowired
   // private AuthServiceClient authClient;

    @Autowired
    private MatchRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Match findByName(String name) {
        Assert.hasLength(name);
        return repository.findByName(name);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Match create(User user, Route route) {

        Match match = new Match();
        match.setOwner(user.getUsername());
        match.setStatus(Status.WAITING);
        match.setQueue(Queue.MATCH);
        match.setUsers(Arrays.asList(user));

        repository.save(match);

        log.info("new match has been created: " + match.getName());

        return match;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void update(Match updatedMatch) {

        Match match = repository.findByName(updatedMatch.getName());
        Assert.notNull(match, "Cannot find match with id: " + updatedMatch.getName());
        match.setUsers(updatedMatch.getUsers());
        match.setStatus(updatedMatch.getStatus());
        match.setQueue(updatedMatch.getQueue());
        match.setRoute(updatedMatch.getRoute());
        match.setOwner(updatedMatch.getOwner());

        repository.save(match);

        log.debug("Changes saved for match: "+ updatedMatch.getName());
    }

    @Override
    public List<Match> findByStatus(Status status, Pageable pageable) {
        return repository.findByStatus(status,pageable);
    }

    @Override
    public List<Match> findAllByStatus(Status status) {
        return repository.findAllByStatus(status);
    }


}
