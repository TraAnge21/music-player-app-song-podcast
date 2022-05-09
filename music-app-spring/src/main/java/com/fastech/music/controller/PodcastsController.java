package com.fastech.music.controller;

import com.fastech.music.global.APIResponse;
import com.fastech.music.model.Podcasts;
import com.fastech.music.service.PodcastsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/podcasts")
@CrossOrigin("http://localhost:3000/")
public class PodcastsController {
    @Autowired
    private PodcastsService podcastsService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllPodcasts(){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(podcastsService.getAllPodcasts());
            podcastsAPIResponse.setMessage(podcastsService.getAllPodcasts().size()+" Podcasts Found");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }

    @PostMapping("/addPodcast")
    public ResponseEntity<?> addPodcast(@RequestBody Podcasts podcast){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(Collections.singletonList(podcastsService.addPodcast(podcast)));
            podcastsAPIResponse.setMessage("1 Podcasts Saved to DB");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }
    @PostMapping("/addAll")
    public ResponseEntity<?> addAll(@RequestBody List<Podcasts> podcast){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(podcastsService.addAll(podcast));
            podcastsAPIResponse.setMessage(podcastsService.addAll(podcast).size()+ " Podcasts Saved to DB");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }

    @PutMapping("/updatePodcast")
    public ResponseEntity<?> updatePodcast(@RequestBody Podcasts podcast){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(Collections.singletonList(podcastsService.updatePodcast(podcast)));
            podcastsAPIResponse.setMessage("1 Podcasts Updated to DB");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(Collections.singletonList(podcastsService.findById(id)));
            podcastsAPIResponse.setMessage("1 Podcasts Found");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }

    @Transactional
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id){
        APIResponse<Podcasts> podcastsAPIResponse = new APIResponse<>();
        try{
            podcastsAPIResponse.setData(Collections.singletonList(podcastsService.deletePodcastById(id)));
            podcastsAPIResponse.setMessage("1 Podcasts Deleted");
            return ResponseEntity.ok(podcastsAPIResponse);
        }catch (Exception e){
            return returnResponseWithError(podcastsAPIResponse, e);
        }
    }

    private ResponseEntity<APIResponse<Podcasts>> returnResponseWithError(APIResponse<Podcasts> podcastsAPIResponse, Exception e) {
        podcastsAPIResponse.setHasError(false);
        podcastsAPIResponse.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(podcastsAPIResponse);
    }


}
