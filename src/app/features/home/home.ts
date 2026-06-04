import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';

interface AuthUser {
  name: string;
  email: string;
  token?: string;
}

@Component({
  selector: 'app-home',
  imports: [ButtonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  loggedIn = false;
  user: AuthUser | null = null;
  showEmail = false;
  showbtn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.loggedIn = !!this.user?.email;
      } catch {
        this.user = null;
        this.loggedIn = false;
      }
    }
  }

  logout() {
    localStorage.removeItem('authUser');
    this.user = null;
    this.loggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  showUserEmail() {
    this.showEmail = true;
  }

  hideUserEmail() {
    this.showEmail = false;
  }

  @HostListener('window:scroll')
  checkscroll() {
    this.showbtn = window.scrollY > 300;
  }
}
