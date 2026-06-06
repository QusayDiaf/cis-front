import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
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
      // console.log(this.loginForm.value ,"the form value");
    } else {
      console.log("the form is invalid");
      this.loginForm.markAllAsTouched();
    }
    if(this.loginForm.valid){
      const apiUrl = ' https://186908fb55d69a7c-165-16-127-31.serveousercontent.com/api/login';
      console.log("loading ... the form is valid and sending to api");
      this.http.post(apiUrl, this.loginForm.value ).subscribe({
        next: (response: any) => {
          console.log('API connection successful', response);
          const email = this.loginForm.value.email;
          const userName = response?.user?.name || response?.name || email.split('@')[0] || 'User';
          const authUser = {
            name: userName,
            email,
            token: response?.token || response?.access_token || ''
          };
          localStorage.setItem('authUser', JSON.stringify(authUser));
          alert('Signed in successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('API connection error', err);
          alert('Invalid username or password.');
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
