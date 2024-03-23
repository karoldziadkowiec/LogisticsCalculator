package com.LogisticsCalculator.LogisticsCalculator.Interfaces;

import com.LogisticsCalculator.LogisticsCalculator.Models.Task;
import org.springframework.stereotype.Repository;

public interface ITaskRepository {
    Task getById(int id);

}