package com.example.cms.controller;

import com.example.cms.model.Customer;
import com.example.cms.model.Department;
import com.example.cms.service.ICustomerService;
import com.example.cms.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;
    private IDepartmentService departmentService;

    @GetMapping
    private ResponseEntity<List<Customer>> findAll() {
        return new ResponseEntity<>(customerService.findAll(), HttpStatus.OK);
    }


    @PostMapping
    private ResponseEntity<Customer> create(@RequestBody Customer customer) {
        return new ResponseEntity<>(customerService.save(customer), HttpStatus.CREATED);
    }

    @PutMapping
    private ResponseEntity<Customer> update(@RequestBody Customer customer) {
        Optional<Customer> customerOptional = customerService.findById(customer.getId());
        if (customerOptional.isPresent()) {
            return new ResponseEntity<>(customerService.save(customer), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        customerService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Customer> detail(@PathVariable("id") Long id) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (customerOptional.isPresent()) {
            return new ResponseEntity<>(customerOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
