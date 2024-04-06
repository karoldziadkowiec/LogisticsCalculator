package com.LogisticsCalculator.LogisticsCalculator.Main;
import java.util.ArrayList;
import java.util.*;

public class GraphDesigner
{
    List<Activity> root;
    List<Activity> endRoot;
    public GraphDesigner()
    {
        root = new ArrayList<Activity>();
        endRoot = new ArrayList<Activity>();
    }

    public void designGraph()
    {
        int size = Activity.activitiesContainer.size();
        for(int i = 0; i < size; i++)
        {
            Activity one = Activity.activitiesContainer.get(i);
            if(one.dependencyNames.size() == 0)
            {
                this.root.add(one);
            }
            
            for(int j= 0; j < one.dependencyNames.size(); j++)
            {
                Activity activity = one.getActivityByName(one.dependencyNames.get(j));
                
                one.parentList.add(activity);
                activity.childList.add(one);
            }
        }

        for(int i = 0; i < size; i++)
        {
            if(Activity.activitiesContainer.get(i).childList.size() == 0)
                this.endRoot.add(Activity.activitiesContainer.get(i));
        }
    }

    public void calculateEarlyTimes(Activity activity)
    {
        int size = activity.parentList.size();
        int temp = 0;
        for(int i = 0; i < size; i++ )
        {
            Activity parent = activity.parentList.get(i);
            int earlyFinish = parent.earlyFinish;
            if(temp < earlyFinish)
                temp = earlyFinish;

        }
        activity.earlyStart = temp;
        activity.earlyFinish = temp + activity.duration;
        activity.isChecked = true;
    }

    public void calculateLateTimes(Activity activity, int projectDeadLine)
    {
        if(activity.childList.size() == 0)
        {
            activity.lateFinish = projectDeadLine;
            activity.lateStart = projectDeadLine - activity.duration;
            activity.slackTime = activity.lateStart - activity.earlyStart;
        }
        else
        {
            int size = activity.childList.size();
            int temp = projectDeadLine + 1;
            for(int i = 0; i < size; i++ )
            {
                Activity child = activity.childList.get(i);
                int lateStart = child.lateStart;
                if(temp > lateStart)
                    temp = lateStart;
            }
            System.out.println(projectDeadLine + "  " + temp);
            activity.lateFinish = temp;
            activity.lateStart = temp - activity.duration;
            activity.slackTime = activity.lateStart - activity.earlyStart;
        }
        activity.isChecked = false;
    }
}