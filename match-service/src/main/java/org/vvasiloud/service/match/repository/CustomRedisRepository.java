package org.vvasiloud.service.match.repository;


import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands.GeoLocation;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomRedisRepository {

    GeoResults<GeoLocation<String>> findGeoRadiusByMember (String username);

}
