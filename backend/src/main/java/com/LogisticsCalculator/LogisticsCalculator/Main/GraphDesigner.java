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

    public void moveForward()
    {
        Queue<Activity> queue = new LinkedList<Activity>();

        System.out.println("in forward");
        for(int i = 0; i < root.size(); i++)
        {
            queue.add(root.get(i));
        }

        System.out.println("in forward");
        try
        {
            System.out.println("in forward");
            System.out.println(root.size());
            if(root.size() == 0)
                throw new RuntimeException("This system has no independent nodes.");
        }
        catch (RuntimeException exp) {
            System.out.println(exp.getMessage());
            System.exit(1);
        }

        int counter = 0;
        while(queue.size() != 0)
        {
            boolean isVerified = false;

            Activity activity = queue.remove();
            calculateEarlyTimes(activity);

            counter++;
            for(int i = 0; i < activity.childList.size(); i++)
            {
                Activity child = activity.childList.get(i);
                for(int k = 0; k < child.parentList.size(); k++)
                {
                    Activity parent = child.parentList.get(k);
                    if(!parent.isChecked)
                    {
                        isVerified = false;
                        break;
                    }
                    isVerified = true;
                }
                if(isVerified)
                    queue.add(child);
            }
        }
        try {
            if (counter < Activity.activitiesContainer.size()) {
                throw new RuntimeException("There is a circular dependency in the system.");
            }
        } catch (RuntimeException exp) {
            System.out.println(exp.getMessage());
            System.exit(1);
        }
    }

    public void moveBack()
    {
        Queue<Activity> queue = new LinkedList<Activity>();
        int globalFinish= 0;

        for(int i = 0; i < endRoot.size(); i++)
        {
            queue.add(endRoot.get(i));
            if(endRoot.get(i).earlyFinish > globalFinish)
                globalFinish = endRoot.get(i).earlyFinish;
        }
        while(queue.size() != 0)
        {
            boolean isVerified = false;
            Activity activity = queue.remove();
            calculateLateTimes(activity, globalFinish);

            for(int i = 0; i < activity.parentList.size(); i++)
            {
                Activity parent = activity.parentList.get(i);
                for(int j = 0; j < parent.childList.size(); j++)
                {
                    Activity child = parent.childList.get(j);
                    if(child.isChecked)
                    {
                        isVerified = false;
                        break;
                    }
                    isVerified = true;
                }
                if(isVerified)
                    queue.add(parent);
            }
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

    public void createCritialPath()
    {
        for(int i = 0; i < root.size(); i++)
        {
            Activity.printCriticalPath(root.get(i), "");
        }
    }
}