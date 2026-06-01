import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-welcome',
  imports: [FormsModule,ButtonModule,RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  // sidephoto: string ='assets/images/photo.jpeg';


}
