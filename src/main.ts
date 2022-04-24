import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {APP_CONFIG} from 'environments/environment';
import {AppModule} from 'app/app.module';

if (APP_CONFIG.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
