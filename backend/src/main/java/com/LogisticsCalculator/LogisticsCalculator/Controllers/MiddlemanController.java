package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/middleman")
public class MiddlemanController {
    //private final TaskRepository taskRepository;

    @Autowired
    public MiddlemanController() {

    }
    @GetMapping()
    public int callMiddleman(){
        return 2;
    }


}