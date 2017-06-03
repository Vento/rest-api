package org.vvasiloud.service.match.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands.GeoLocation;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;

import static org.springframework.data.redis.connection.RedisGeoCommands.DistanceUnit.KILOMETERS;
import static org.springframework.data.redis.connection.RedisGeoCommands.GeoRadiusCommandArgs.newGeoRadiusArgs;

public class CustomRedisRepositoryImpl implements CustomRedisRepository {

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    private GeoOperations<String,String> geoOperations = redisTemplate.opsForGeo();

    public GeoResults<GeoLocation<String>> findGeoRadiusByMember(String username) {
        GeoResults<GeoLocation<String>> result = geoOperations.geoRadiusByMember("locations:position", username, new Distance(100, KILOMETERS),
                newGeoRadiusArgs().includeDistance().sortDescending());
        return result;
    }
}
