package com.LogisticsCalculator.LogisticsCalculator.Models.Middleman;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MiddlemanDetails {
    public int numSuppliers;
    public int numConsumers;
    public List<Integer> suppliersSupply;
    public List<Integer> suppliersProductCost;
    public List<Integer> consumersDemand;
    public List<Integer> consumersPurchase;
    public int[][] transportationCosts;

    public MiddlemanDetails() {
    }
    public MiddlemanDetails(int numSuppliers, int numConsumers, List<Integer> suppliersSupply, List<Integer> suppliersProductCost, List<Integer> consumersDemand, List<Integer> consumersPurchase) {
        this.numSuppliers = numSuppliers;
        this.numConsumers = numConsumers;
        this.suppliersSupply = suppliersSupply;
        this.suppliersProductCost = suppliersProductCost;
        this.consumersDemand = consumersDemand;
        this.consumersPurchase = consumersPurchase;
    }

    public void setNumSuppliers(int numSuppliers) {
        this.numSuppliers = numSuppliers;
    }

    public void setNumConsumers(int numConsumers) {
        this.numConsumers = numConsumers;
    }

    public void setTransportationCosts(int[][] transportationCosts) {
        this.transportationCosts = transportationCosts;
    }
}