import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './singup.html',
  styleUrl: './singup.css',
})
export class Singup {
  singupform!: FormGroup;
  terms: boolean = false;
  hidepassword: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.singupform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') 
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    }, { updateOn: 'submit' }); 
  }

  onsubmit() {
    const password = this.singupform.get('password')?.value;
    const confirmPassword = this.singupform.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.singupform.get('confirmPassword')?.setErrors({ mismatch: true });
      console.log("password and confirm password do not match");
    } else {
      this.singupform.get('confirmPassword')?.setErrors(null);
      console.log("password and confirm password match");
    }

    console.log("the form is submitted");

    if (this.singupform.valid) {
      console.log(this.singupform.value, "the form value");
      
      const apiUrl = 'https://tripoli-auth-test.free.beeceptor.com/register';
      console.log("loading ... the form is valid and sending to api");

      this.http.post(apiUrl, this.singupform.value, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('API connection successful', response); 
          alert('sing in successfully!');  
          },
        error: (err) => {
          console.error('API connection error', err);
          alert('api connection failed.');
        }
      }); 

    } else {
      console.log("the form is invalid");
      this.singupform.markAllAsTouched();
    }
  } 

  ternschange(){
    this.terms = !this.terms;
    console.log(this.terms);
  }

  viewpassword(){
    this.hidepassword = !this.hidepassword;
  } 
}