import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // 1. قمنا باستيراد withInMemoryScrolling هنا
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    
    // 2. تعديل الـ Router لتفعيل الـ Anchor Scrolling
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',          // يفعل النزول للـ ID المحدد
        scrollPositionRestoration: 'enabled' // يحافظ على موقع الصفحة عند التنقل
      })
    ),
    
    providePrimeNG({
      ripple: true,
      theme:{ 
        preset: Aura,
        options: {
            darkModeSelector: 'none' 
        }
      } ,
    }),
  ]
};