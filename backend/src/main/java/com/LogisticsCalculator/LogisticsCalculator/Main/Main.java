package com.LogisticsCalculator.LogisticsCalculator.Main;
import java.util.Scanner;

public class Final extends Throwable
{
    public static void main(String[] args)
    {
        System.out.println("Enter the number of activities:");
        Scanner scanner = new Scanner(System.in);

        InputHandler takeInput = new InputHandler(scanner.nextInt());
        takeInput.enterNodeDetails();

        GraphDesigner graphDesigner = new GraphDesigner();
        graphDesigner.designGraph();

        graphDesigner.moveForward();
        graphDesigner.moveBack();
        Activity.identifyCriticalActivities();
        Activity.printTable();
        graphDesigner.createCritialPath();
    }
}