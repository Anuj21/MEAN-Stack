import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private getUrl = '/api/employees';
  private getEmployeeUrl = '/api/employees/';
  private postUrl = '/api/employee';
  private putUrl = '/api/employee/';
  private deleteUrl = '/api/employee/';

  getEmployees(): Observable<Employee[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Employee[]>(this.getUrl, httpOptions);
  }

  getEmployee(id: string): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Employee>(this.getEmployeeUrl + id, httpOptions);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Employee>(
      this.postUrl,
      JSON.stringify(employee),
      httpOptions
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<Employee>(
      this.putUrl + employee._id,
      JSON.stringify(employee),
      httpOptions
    );
  }

  removeEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(this.deleteUrl + employee._id);
  }
}
