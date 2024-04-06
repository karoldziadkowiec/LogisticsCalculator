package com.LogisticsCalculator.LogisticsCalculator.Controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.LogisticsCalculator.LogisticsCalculator"})
public class LogisticsCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogisticsCalculatorApplication.class, args);
	}

}