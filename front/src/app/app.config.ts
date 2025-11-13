import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PoHttpRequestModule, PoModule, PoNotificationService } from '@po-ui/ng-components';

import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // fornecendo rotas
    provideHttpClient(withFetch()), // config para a API - LIGAÇÃO ENTRE BACK E FRONT
    provideAnimations(), // necessário para PO UI
    importProvidersFrom([
      PoHttpRequestModule]),
      PoNotificationService,
      ReactiveFormsModule,
      PoModule
  ],
};
