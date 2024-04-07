package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;
import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.CPMService;
import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.GraphDesigner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cpm")
public class CPMController {
    private final CPMService _cpmService;
    @Autowired
    public CPMController(CPMService cpmService) {
        this._cpmService = cpmService;
    }

    @PostMapping
    public List<Activity> solveCPMIssue(@RequestBody List<Activity> activities){
        List<Activity> activitiesContainer = _cpmService.solveCPM(activities);
        return activitiesContainer;
    }
}