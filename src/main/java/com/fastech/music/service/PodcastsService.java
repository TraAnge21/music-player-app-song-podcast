package com.fastech.music.service;

import com.fastech.music.model.Podcasts;
import com.fastech.music.repository.PodcastsRepository;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.List;

@Service
@Slf4j
public class PodcastsService {
    @Autowired
    private PodcastsRepository podcastsRepository;

    public List<Podcasts> getAllPodcasts(){
        return podcastsRepository.findAll();
    }

    public Podcasts addPodcast(Podcasts podcast) throws Exception {
        try{
            return podcastsRepository.save(podcast);
        }catch (Exception e){
            log.error("ERROR: "+e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public Podcasts updatePodcast(Podcasts podcast) throws Exception {
        try{
            Podcasts findPodcast = podcastsRepository.findById(podcast.getId()).orElseThrow(()-> new Exception("Podcast not found for id = "+podcast.getId()));
            if (podcast.getArtist()!=null)
                findPodcast.setArtist(podcast.getArtist());
            if (podcast.getAudio()!=null)
                findPodcast.setAudio(podcast.getAudio());
            if (podcast.getDescription()!=null)
                findPodcast.setDescription(podcast.getDescription());
            if (podcast.getImage()!=null)
                findPodcast.setImage(podcast.getImage());
            if (podcast.getName()!=null)
                findPodcast.setName(podcast.getName());
            if (podcast.getSource()!=null)
                findPodcast.setSource(podcast.getSource());
            if (podcast.getTitle()!=null)
                findPodcast.setTitle(podcast.getTitle());
            return podcastsRepository.save(findPodcast);
        }catch (Exception e){
            log.error("ERROR: "+e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public Podcasts deletePodcastById(Long podcastId) throws Exception {
        try {
            Podcasts findPodcast = podcastsRepository.findById(podcastId).orElseThrow(() -> new Exception("Podcast not found for id = " + podcastId));
            podcastsRepository.delete(findPodcast);
            return findPodcast;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
    public Podcasts findById(Long podcastId) throws Exception {
        try {
            return podcastsRepository.findById(podcastId).orElseThrow(() -> new Exception("Podcast not found for id = " + podcastId));
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public List<Podcasts> addAll(List<Podcasts> podcast) {
        return podcastsRepository.saveAll(podcast);
    }
}
