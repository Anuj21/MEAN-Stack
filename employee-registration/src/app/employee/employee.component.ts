import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

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

  isEdit: boolean;
  id: string;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formValidationService: FormValidationService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map((param) => param.get('id')))
      .subscribe(async (res) => {
        this.id = res;
        this.isEdit = res !== null;

        if (this.id !== null) {
          const employeeToEdit = await this.employeeService
            .getEmployee(this.id)
            .toPromise();

          this.employeeRegistrationForm.patchValue({
            name: employeeToEdit.name,
            position: employeeToEdit.position,
            office: employeeToEdit.office,
            salary: employeeToEdit.salary,
          });
        }
      });
  }

  cancel(): void {
    this.router.navigate(['./employees']);
  }

  register(employee: Employee): void {
    if (this.employeeRegistrationForm.invalid) {
      this.formValidationService.showErrors(this.employeeRegistrationForm);
      return;
    }

    if (this.id !== null) {
      this.editEmployee({
        _id: this.id,
        name: employee.name,
        position: employee.position,
        office: employee.office,
        salary: employee.salary,
      });
    } else {
      this.addEmployee(employee);
    }
  }

  addEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(
      (data) => {
        alert(data.name + ' has been signed up');
        this.router.navigate(['/employees']);
      },
      (err) => {
        console.log(err.status);
        alert('employee registration is unsuccessful');
      }
    );
  }

  editEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (data) => {
        alert(data.name + ' has been updated');
        this.router.navigate(['/employees']);
      },
      (err) => {
        console.log(err);
        alert('employee update is unsuccessful');
      }
    );
  }
}
