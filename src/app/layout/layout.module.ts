import {NgModule} from '@angular/core';
import {LayoutComponent} from 'app/layout/layout.component';
import {EmptyLayoutModule} from 'app/layout/layouts/empty/empty.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    EmptyLayoutModule
  ],
  exports: [
    EmptyLayoutModule
  ]
})
export class LayoutModule {
}
