import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormValidationService } from '../services/form-validation/form-validation.service';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeeListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
  providers: [FormValidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
