import { ApplicationConfig } from '@angular/core';
import { provideToastr } from 'ngx-toastr';

import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideBrowserGlobalErrorListeners } from '@angular/core';

import { routes } from './app.routes';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { errorInterceptor } from './core/interceptors/errors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withHashLocation(),
    ),

    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorInterceptor,loadingInterceptor])),
    provideToastr(), // Toastr providers

  ],
};
