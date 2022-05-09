package com.fastech.music.repository;

import com.fastech.music.model.Podcasts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PodcastsRepository extends JpaRepository<Podcasts, Long> {
}
