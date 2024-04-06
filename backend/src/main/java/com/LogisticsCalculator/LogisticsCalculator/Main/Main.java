package com.LogisticsCalculator.LogisticsCalculator.Main;
import java.util.Scanner;

public class Main
{
    public static void main(String[] args)
    {
        System.out.println("Enter the number of activities:");
        Scanner scanner = new Scanner(System.in);

        InputHandler inputHandler = new InputHandler(scanner.nextInt());
        inputHandler.enterNodeDetails();

        GraphDesigner graphDesigner = new GraphDesigner();
        graphDesigner.designGraph();

        graphDesigner.moveForward();
        graphDesigner.moveBack();
        Activity.identifyCriticalActivities();
        Activity.printTable();
        graphDesigner.createCritialPath();
    }
}