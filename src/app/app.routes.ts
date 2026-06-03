import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    { 
        path: 'auth/login', 
         loadComponent: () => import('./features/auth/login/login').then(m => m.Login) 
    },
    { 
      path: 'auth/singup', 
      loadComponent: () => import('./features/auth/singup/singup').then(m => m.Singup) 
    },
    {
      path: 'auth/welcome/welcome',
      loadComponent: () => import('./features/auth/welcome/welcome').then(m => m.Welcome)
    }
   
];
