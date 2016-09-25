package org.vvasiloud.service.match.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.vvasiloud.service.match.domain.Match;
import org.vvasiloud.service.match.domain.Status;

import java.util.List;

/**
 * Created by Aeon on 25/9/2016.
 */
@Repository
public interface MatchRepository extends CrudRepository<Match, String> {

    Match findById(String id);

    List<Match> findByStatus(Status status, Pageable pageable);

}