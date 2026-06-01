import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./features/auth/welcome/welcome').then(m => m.Welcome)
    },
    { 
        path: 'auth/login', 
         loadComponent: () => import('./features/auth/login/login').then(m => m.Login) 
    },
    { 
      path: 'auth/singup', // تم تصحيح طريقة التحميل هنا أيضاً
      loadComponent: () => import('./features/auth/singup/singup').then(m => m.Singup) 
    },
    {
      path: 'home',
      loadComponent: () => import('./features/home/home').then(m => m.Home)
    }
   
];
