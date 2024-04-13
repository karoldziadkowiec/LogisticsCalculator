package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import com.LogisticsCalculator.LogisticsCalculator.Services.CPM.CPMService;
import com.LogisticsCalculator.LogisticsCalculator.Services.Middleman.MiddlemanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/middleman")
@CrossOrigin(origins = "http://localhost:3000")
public class MiddlemanController {
    private final MiddlemanService _middlemanService;
    @Autowired
    public MiddlemanController(MiddlemanService middlemanService) {
        this._middlemanService = middlemanService;
    }

    @GetMapping()
    public int callMiddleman(){
        return 2;
    }


}