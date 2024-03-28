package com.LogisticsCalculator.LogisticsCalculator.Repositories;

import com.LogisticsCalculator.LogisticsCalculator.Models.Task;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class TaskRepository {
    private Map<Long, Task> tasks = new HashMap<>();

    public Task getById(int id) {
        return tasks.get(id);
    }


}