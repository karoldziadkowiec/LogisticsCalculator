package com.LogisticsCalculator.LogisticsCalculator.Interfaces;

import com.LogisticsCalculator.LogisticsCalculator.Models.Task;

public interface ITaskRepository {
    Task getById(int id);

}