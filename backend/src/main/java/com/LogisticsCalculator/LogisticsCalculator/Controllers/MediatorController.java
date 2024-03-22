package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mediator")
public class MediatorController {
    //private final TaskRepository taskRepository;

    @Autowired
    public MediatorController() {

    }
    @GetMapping()
    public int callMediator(){
        return 2;
    }


}