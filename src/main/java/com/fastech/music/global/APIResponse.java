package com.fastech.music.global;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class APIResponse<T> {
    private List<T> data;
    private String message;
    private Boolean hasError = false;
}
