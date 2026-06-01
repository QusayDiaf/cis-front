import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';


@Component({
  selector: 'app-home',
  imports: [ButtonModule,FormsModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
