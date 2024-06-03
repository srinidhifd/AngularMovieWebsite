import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.http
      .get<any>('https://angularmoviewebsite.onrender.com/register')
      .subscribe(
        (users) => {
          const emailExists = users.some(
            (user: any) => user.email === this.registerForm.value.email
          );
          const usernameExists = users.some(
            (user: any) => user.userName === this.registerForm.value.userName
          );

          if (emailExists) {
            alert('Email already exists!');
            return;
          }

          if (usernameExists) {
            alert('Username already exists!');
            return;
          }

          this.http
            .post<any>('https://angularmoviewebsite.onrender.com/register', this.registerForm.value)
            .subscribe(
              (result) => {
                alert('Register Successful !!');
                this.registerForm.reset();
                this.router.navigate(['signin']);
              },
              (err) => {
                alert('Something went wrong');
              }
            );
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
