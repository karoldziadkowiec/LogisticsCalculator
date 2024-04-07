package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;
import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.GraphDesigner;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cpm")
public class CPMController {
    @PostMapping
    public List<Activity> solveCPMIssue(@RequestBody List<Activity> activities){
        GraphDesigner graphDesigner = new GraphDesigner(activities);
        graphDesigner.designGraph();
        graphDesigner.moveForward();
        graphDesigner.moveBack();
        Activity.identifyCriticalActivities(activities);

        return activities;
    }
}