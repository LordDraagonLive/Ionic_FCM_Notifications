import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SomePage } from './some';

@NgModule({
  declarations: [
    SomePage,
  ],
  imports: [
    IonicPageModule.forChild(SomePage),
  ],
})
export class SomePageModule {}
