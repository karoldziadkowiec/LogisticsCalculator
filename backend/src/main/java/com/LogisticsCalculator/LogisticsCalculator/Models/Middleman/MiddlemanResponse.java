package com.LogisticsCalculator.LogisticsCalculator.Models.Middleman;

public class MiddlemanResponse {
    public int[][] unitProfitMatrix;
    public int[][] optimalTransportMatrix;
    public int resultTransport;
    public int resultPurchaseCost;
    public int totalCost;
    public int resultSalesIncome;
    public int profit;
    public MiddlemanResponse(int[][] unitProfitMatrix, int[][] optimalTransportMatrix, int resultTransport, int resultPurchaseCost, int totalCost, int resultSalesIncome, int profit){
        this.unitProfitMatrix = unitProfitMatrix;
        this.optimalTransportMatrix = optimalTransportMatrix;
        this.resultTransport = resultTransport;
        this.resultPurchaseCost = resultPurchaseCost;
        this.totalCost = totalCost;
        this.resultSalesIncome = resultSalesIncome;
        this.profit = profit;
    }
}