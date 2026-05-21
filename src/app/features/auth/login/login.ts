import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  hidepassword:boolean =true;

  viewpassword(){
    this.hidepassword = !this.hidepassword;
  }
}
