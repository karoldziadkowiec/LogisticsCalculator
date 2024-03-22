package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Models.Task;
import com.LogisticsCalculator.LogisticsCalculator.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cpm")
public class CPMController {
    private final TaskRepository taskRepository;
    @Autowired
    public CPMController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping()
    public int callCPM(){
        return 1;
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable int id) {
        return taskRepository.getById(id);
    }
}