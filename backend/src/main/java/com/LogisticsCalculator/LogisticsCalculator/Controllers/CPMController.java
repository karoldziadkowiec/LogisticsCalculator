package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cpm")
public class CPMController {
    //private final TaskRepository taskRepository;

    @Autowired
    public CPMController() {

    }

    @GetMapping()
    public int callCPM(){
        return 1;
    }


}