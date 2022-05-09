package com.fastech.music.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "podcasts")
@Getter
@Setter
public class Podcasts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String artist;
    @Column(length = 100000)
    private String description;
    private String source;
    private String audio;
    private String image;
    private String title;
}
