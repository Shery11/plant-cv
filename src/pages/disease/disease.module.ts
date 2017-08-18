import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiseasePage } from './disease';

@NgModule({
  declarations: [
    DiseasePage,
  ],
  imports: [
    IonicPageModule.forChild(DiseasePage),
  ],
})
export class DiseasePageModule {}
