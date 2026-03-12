import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appConfig } from './app.config';

const browserConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
  ]
};

export const config = mergeApplicationConfig(appConfig, browserConfig);