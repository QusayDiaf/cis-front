import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // استيراد وسم التمرير فقط
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    
    provideRouter(
      routes,
      // دالة واحدة تكفي لإدارة كل تفاصيل السكرول والتنقل لـ Fragments
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled', // إرجاع السكرول للأعلى عند الانتقال لصفحة جديدة
        anchorScrolling: 'enabled'            // تفعيل التنقل الداخلي للروابط (Fragments)
      })
    ),
    
    providePrimeNG({
      ripple: true,
      theme: { 
        preset: Aura,
        options: {
            darkModeSelector: 'none' 
        }
      },
    }),
  ]
};