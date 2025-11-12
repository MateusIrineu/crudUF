import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PoHttpRequestModule, PoNotificationService } from '@po-ui/ng-components';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // fornecendo rotas
    provideHttpClient(withFetch()), // config para a API - LIGAÇÃO ENTRE BACK E FRONT
    importProvidersFrom([PoHttpRequestModule]),
    PoNotificationService
  ],
};
