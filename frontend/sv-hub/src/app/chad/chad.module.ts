import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChadPageRoutingModule } from './chad-routing.module';

import { ChadPage } from './chad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChadPageRoutingModule
  ],
  declarations: [ChadPage]
})
export class ChadPageModule {}
