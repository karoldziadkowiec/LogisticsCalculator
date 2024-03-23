package com.LogisticsCalculator.LogisticsCalculator.Repositories;

import com.LogisticsCalculator.LogisticsCalculator.Interfaces.ITaskRepository;
import com.LogisticsCalculator.LogisticsCalculator.Models.Task;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class TaskRepository implements ITaskRepository {
    private Map<Long, Task> tasks = new HashMap<>();

    @Override
    public Task getById(int id) {
        return tasks.get(id);
    }


}