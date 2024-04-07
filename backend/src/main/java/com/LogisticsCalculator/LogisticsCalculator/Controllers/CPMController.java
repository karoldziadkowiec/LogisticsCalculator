package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;
import com.LogisticsCalculator.LogisticsCalculator.Models.ActivityRequest;
import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.CPMService;
import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.GraphDesigner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/cpm")
@CrossOrigin(origins = "http://localhost:3000")
public class CPMController {
    private final CPMService _cpmService;
    @Autowired
    public CPMController(CPMService cpmService) {
        this._cpmService = cpmService;
    }

    @PostMapping
    public List<ActivityRequest> solveCPMIssue(@RequestBody List<Activity> activities) {
        List<Activity> activitiesContainer = _cpmService.solveCPM(activities);
        List<ActivityRequest> activityRequest = _cpmService.initializeValues(activitiesContainer);
        return activityRequest;
    }

    @PostMapping("critical-path")
    public List<String> provideCriticalPath(@RequestBody List<ActivityRequest> activities) {
        List<String> activityNames = _cpmService.provideCriticalPath(activities);
        return activityNames;
    }
}