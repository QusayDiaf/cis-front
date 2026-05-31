import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  // depindency injection
  constructor(private fb: FormBuilder ,private http: HttpClient) {
  this.loginForm = this.fb.group({
    email: ['', 
      {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'submit' 
     }
    ],

    
    password: [
      '', 
      {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
        ],
        updateOn: 'submit' 
      }
    ],
  });
}

  onsubmit() {
    console.log("the form is submitted");
    if (this.loginForm.valid) {
      console.log(this.loginForm.value ,"the form value");
    } else {
      console.log("the form is invalid");
      this.loginForm.markAllAsTouched();
    }
    if(this.loginForm.valid){
      const apiUrl = 'https://tripoli-auth-test.free.beeceptor.com/register';
      console.log("loading ... the form is valid and sending to api");
      this.http.post(apiUrl, this.loginForm.value ,{ responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('API connection successful', response);
          alert('sing in successfully!');
        },
        error: (err) => {
          console.error('API connection error', err);
          alert('Failed to sign in.');
        }
      }); 
    } else {
      console.log("the form is invalid");
      this.loginForm.markAllAsTouched();
    }
  }

  rememberme: boolean = false;
  
  remembermechange() {
    this.rememberme = !this.rememberme;
    console.log(this.rememberme);
  }

  hidepassword: boolean = true;

  viewpassword() {
    this.hidepassword = !this.hidepassword;
  }
 
}
