import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

registerLocaleData(localeEn);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
