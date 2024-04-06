package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cpm")
public class CPMController {

    @PostMapping()
    public List<Activity> solveCPMIssue(@RequestBody List<Activity> activities){

        return activities;
    }
}