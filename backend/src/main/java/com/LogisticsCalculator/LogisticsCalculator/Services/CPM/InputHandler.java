package com.LogisticsCalculator.LogisticsCalculator.Services.CPM;
import com.LogisticsCalculator.LogisticsCalculator.Models.Activity;

import java.util.*;

public class InputHandler
{
    int nodesNumber;
    public InputHandler(int nodesNumber)
    {
        this.nodesNumber = nodesNumber;
    }

    public void enterNodeDetails()
    {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the activity input details:");
        for(int i = 0; i < nodesNumber; i++)
        {
            int activityID = i + 1;
            System.out.println("Details of the activity " + activityID);

            System.out.println("Enter activity name:");
            String activityName = scanner.next();

            List<String> dependency = new ArrayList<String>();
            System.out.println("Enter dependency names below:");
            while(true)
            {
                System.out.println("Enter dependency name:");
                String dependencyName = scanner.next();
                if(dependencyName.equals("-"))
                    break;
                else
                    dependency.add(dependencyName);
            }

            System.out.println("Enter activity duration:");
            int duration = scanner.nextInt();

            Activity activity = new Activity(activityID, activityName, dependency, duration);
        }
    }
}