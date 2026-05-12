import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-home',
  imports: [ButtonModule,FormsModule,Image],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  sidephoto: string ='assets/images/photo.jpeg';

}
