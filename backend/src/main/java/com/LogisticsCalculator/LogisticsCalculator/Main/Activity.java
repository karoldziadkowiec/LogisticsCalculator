package com.LogisticsCalculator.LogisticsCalculator.Main;
import java.util.ArrayList;
import java.util.*;

public class Activity
{
    int id;
    String name;
    List<String> dependencyNames;
    int duration;
    int earlyStart;
    int earlyFinish;
    int lateStart;
    int lateFinish;
    int slackTime;
    String isCriticalActivity;
    boolean isChecked;

    List<Activity> childList;
    List<Activity> parentList;
    static List<Activity> activitiesContainer = new ArrayList<Activity>();
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