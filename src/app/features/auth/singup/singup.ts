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
  apistatus:string = 'connecting to api ...';

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
      password_confirmation: ['', [Validators.required]]
    }, { updateOn: 'submit' }); 
  }

  cheaklaravel(){
    const apiUrl = 'http://127.0.0.1:8000/api/test-connect';
    this.http.get(apiUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('API connection successful', response); 
        this.apistatus = 'API connection successful';
        },
      error: (err) => {
        console.error('API connection error', err);
        this.apistatus = 'API connection error';
      }
    });
  }


  onsubmit() {
    const password = this.singupform.get('password')?.value;
    const password_confirmation = this.singupform.get('password_confirmation')?.value;

    if (password !== password_confirmation) {
      this.singupform.get('password_confirmation')?.setErrors({ mismatch: true });
      console.log("password and confirm password do not match");
    } else {
      this.singupform.get('password_confirmation')?.setErrors(null);
      console.log("password and confirm password match");
    }

    console.log("the form is submitted");

    if (this.singupform.valid) {
      // console.log(this.singupform.value, "the form value");
      
      const apiUrl = 'http://127.0.0.1:8000/api/register';
      console.log("loading ... the form is valid and sending to api");

      this.http.post(apiUrl, this.singupform.value).subscribe({
        next: (response) => {
          console.log('API connection successful', response); 
          alert('sing in successfully!');  
          },
        error: (err) => {
          console.error('API connection error', err);
          console.log('الاكسبشن متع لارفل النفاخة', err.error);
          alert('the email is used before');
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