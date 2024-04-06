package com.LogisticsCalculator.LogisticsCalculator.Models;
import java.util.ArrayList;
import java.util.*;

public class Activity
{
    public int id;
    public String name;
    public List<String> dependencyNames;
    public int duration;
    public int earlyStart;
    public int earlyFinish;
    public int lateStart;
    public int lateFinish;
    public int slackTime;
    public String isCriticalActivity;
    public boolean isChecked;

    public List<Activity> childList;
    public List<Activity> parentList;
    public static List<Activity> activitiesContainer = new ArrayList<Activity>();
    public Activity (int id, String name, List<String> dependencies, int duration)
    {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.earlyStart = 0;
        this.earlyFinish = 0;
        this.lateStart = 0;
        this.lateFinish = 0;
        this.slackTime = 0;
        this.isCriticalActivity = "No";
        childList = new ArrayList<Activity>();
        parentList = new ArrayList<Activity>();

        dependencyNames = new ArrayList<String>();
        this.dependencyNames = dependencies;

        activitiesContainer.add(this);
    }


    public Activity getActivityByID(int activityID)
    {
        return activitiesContainer.get(activityID);
    }

    public Activity getActivityByName(String activityName)
    {
        Activity activity = null;
        for(int i = 0; i < activitiesContainer.size(); i++)
        {
            if(activitiesContainer.get(i).name.equals(activityName))
                activity = activitiesContainer.get(i);
        }
        return activity;
    }

    public static void identifyCriticalActivities()
    {
        for (Activity activity : activitiesContainer) {
            if(activity.slackTime == 0)
                activity.isCriticalActivity = "Yes";
        }
    }

    public static void printTable()
    {
        System.out.printf("|%15s |%15s |%15s |%15s |%15s |%15s |%15s |%15s |%15s|\n", "ID", "Activity Name", "Duration", "Early Start", "Early Finish", "Late Start", "Late Finish", "Slack Time", "Critical activity");

        for (Activity activity : activitiesContainer) {
            System.out.printf("|%15s |%15s |%15s |%15d |%15d |%15d |%15d |%15d |%15s|\n", activity.id, activity.name, activity.duration, activity.earlyStart, activity.earlyFinish, activity.lateStart, activity.lateFinish, activity.slackTime, activity.isCriticalActivity);
        }
    }

    public static void printCriticalPath(Activity activity, String path)
    {
        boolean isVerified = false;
        if(activity.slackTime == 0)
        {
            path = path + " - "+ activity.name;
            isVerified = true;
        }

        if(isVerified)
        {
            if(activity.childList.size() == 0)
                System.out.println(path);

            for(int i = 0; i < activity.childList.size(); i++)
            {
                printCriticalPath(activity.childList.get(i), path);
            }
        }
    }
}