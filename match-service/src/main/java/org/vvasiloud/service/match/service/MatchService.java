package org.vvasiloud.service.match.service;

import org.springframework.data.domain.Pageable;
import org.vvasiloud.service.match.domain.Match;
import org.vvasiloud.service.match.domain.Route;
import org.vvasiloud.service.match.domain.Status;
import org.vvasiloud.service.match.domain.User;

import java.util.List;

/**
 * Created by Aeon on 22/9/2016.
 */
public interface MatchService {

    /**
    * Gets a match by name
    *
    * @param name
    * @return found match
    */
    Match findByName(String name);

    /**
     * Creates a new match
     *
     * @param user
     * @return created match
     */
    Match create(User user, Route route);

    /**
     * Validates and saves match updates
     *
     * @param updatedMatch
     */
    void update(Match updatedMatch);

    /**
     * Return  matches by status
     *
     */
    List<Match> findByStatus(Status status, Pageable pageable);

    /**
     * Return all matches by status
     *
     */
    List<Match> findAllByStatus(Status status);
}
