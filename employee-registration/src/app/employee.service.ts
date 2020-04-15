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
  private postUrl = '/api/employee';

  getEmployees(): Observable<Employee[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Employee[]>(this.getUrl, httpOptions);
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
}
