package com.LogisticsCalculator.LogisticsCalculator.Models;

import java.util.ArrayList;
import java.util.List;

public class Task {
    int id;
    String name;
    int duration;
    List<Task> dependencies;
    int earliestStart;
    int earliestFinish;
    int latestStart;
    int latestFinish;
    int slack;

    public Task(int id, String name, int duration) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.dependencies = new ArrayList<>();
    }

    public void addDependency(Task task) {
        dependencies.add(task);
    }
}