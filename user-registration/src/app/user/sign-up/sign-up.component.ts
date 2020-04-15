import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {}

  signUp(user: User): void {
    this.userService.register(user).subscribe(
      (data) => {
        alert(data.fullName + 'has been signed up');
      },
      (err) => {
        console.log(err.status);
        alert('user registration is unsuccessful');
      }
    );
  }
}
