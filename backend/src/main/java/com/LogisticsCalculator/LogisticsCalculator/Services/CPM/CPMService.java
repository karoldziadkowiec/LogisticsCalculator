package com.LogisticsCalculator.LogisticsCalculator.Services.CPM;

import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CPMService {
    private final List<Activity> activitiesContainer;

    public CPMService(List<Activity> activitiesContainer) {
        this.activitiesContainer = activitiesContainer;
    }

    public List<Activity> solveCPM(List<Activity> activities){
        GraphDesigner graphDesigner = new GraphDesigner(activities);
        graphDesigner.designGraph();
        graphDesigner.moveForward();
        graphDesigner.moveBack();
        Activity.identifyCriticalActivities(activities);

        return activities;
    }
}
