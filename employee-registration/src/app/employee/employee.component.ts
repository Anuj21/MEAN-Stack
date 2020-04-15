import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeRegistrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    office: new FormControl(null, Validators.required),
    salary: new FormControl(null, Validators.required),
  });

  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit() {}

  register(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(
      (data) => {
        alert(data.name + 'has been signed up');
      },
      (err) => {
        console.log(err.status);
        alert('employee registration is unsuccessful');
      }
    );
  }
}
