package com.LogisticsCalculator.LogisticsCalculator.Main;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Final extends Throwable
{
    public static void main(String[] args)
    {
        Final _final = new Final();
        System.out.println("Enter the number of activities:");
        Scanner scanner = new Scanner(System.in);

        InputHandler takeInput = new InputHandler(scanner.nextInt());
        takeInput.enterNodeDetails();

        GraphDesigner graphDesigner = new GraphDesigner();
        graphDesigner.designGraph();

        _final.moveForward(graphDesigner);
        _final.moveBack(graphDesigner);
        Activity.identifyCriticalActivities();
        Activity.printTable();
        _final.createCritialPath(graphDesigner);
    }

    public void moveForward(GraphDesigner graph)
    {
        Queue<Activity> queue = new LinkedList<Activity>();

        System.out.println("in forward");
        for(int i = 0; i < graph.root.size(); i++)
        {
            queue.add(graph.root.get(i));
        }

        System.out.println("in forward");
        try
        {
            System.out.println("in forward");
            System.out.println(graph.root.size());
            if(graph.root.size() == 0)
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
            graph.calculateEarlyTimes(activity);

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

    public void moveBack(GraphDesigner graph)
    {
        Queue<Activity> queue = new LinkedList<Activity>();
        int globalFinish= 0;

        for(int i = 0; i < graph.endRoot.size(); i++)
        {
            queue.add(graph.endRoot.get(i));
            if(graph.endRoot.get(i).earlyFinish > globalFinish)
                globalFinish = graph.endRoot.get(i).earlyFinish;
        }
        while(queue.size() != 0)
        {
            boolean isVerified = false;
            Activity activity = queue.remove();
            graph.calculateLateTimes(activity, globalFinish);

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

    public void createCritialPath(GraphDesigner graph)
    {
        for(int i = 0; i < graph.root.size(); i++)
        {
            Activity.printCriticalPath(graph.root.get(i), "");
        }
    }
}