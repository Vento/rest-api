package org.vvasiloud.service.match.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vvasiloud.service.match.domain.JoinMessage;
import org.vvasiloud.service.match.domain.Match;
import org.vvasiloud.service.match.domain.Status;
import org.vvasiloud.service.match.service.MatchService;

import java.security.Principal;
import java.util.Collection;


/**
 * Created by Aeon on 22/9/2016.
 */
@RestController
public class MatchController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private MatchService matchService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @SubscribeMapping("/ws")
    public Collection<Match> getMatches() throws Exception {
        log.debug("Getting current matches");
        Collection<Match> matchCollection = matchService.findAllByStatus(Status.WAITING);
        return matchCollection;
    }

    @MessageMapping("/match.{matchId}")
    public void joinMatchMessage (@Payload JoinMessage message, @DestinationVariable("matchId") String matchId, Principal principal) {

        message.setUsername(principal.getName());
        simpMessagingTemplate.convertAndSend("/topic/messages/match.{matchId}", message);
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}
