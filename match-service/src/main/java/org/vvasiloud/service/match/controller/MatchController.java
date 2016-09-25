package org.vvasiloud.service.match.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.vvasiloud.service.match.domain.Match;
import org.vvasiloud.service.match.domain.Status;
import org.vvasiloud.service.match.domain.User;
import org.vvasiloud.service.match.service.MatchService;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * Created by Aeon on 22/9/2016.
 */
public class MatchController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private MatchService matchService;


    @SubscribeMapping("/rooms")
    public List<Match> getMatches(Pageable pageable) throws Exception {
        log.debug("Getting current matches");
        List<Match> matchArrayList = matchService.findByStatus(Status.WAITING, pageable);
        return matchArrayList;
    }

    @MessageMapping("/rooms")
    @SendTo("/topic/messages/{id}")
    public void join(Match match, User user) throws Exception {
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        log.debug("User " + user.getUsername() + "Joined match " + match.getId() + " " + time);
    }

    //@PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Match getMatchById(@PathVariable String id) {
        return matchService.findById(id);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public void updateMatch(@PathVariable String id,@Valid @RequestBody Match match) {
        matchService.update(match);
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}
