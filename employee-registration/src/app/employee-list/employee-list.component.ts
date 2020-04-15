import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[];
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        console.log('employees', res);
        this.employees = res;
        this.cd.markForCheck();
      });
  }

  addEmployee(): void {
    this.router.navigate(['/employee']);
  }
}
