import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChadPageRoutingModule } from './chad-routing.module';

import { ChadPage } from './chad.page';
import {PostComponent} from "../components/post/post.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChadPageRoutingModule
  ],
  declarations: [ChadPage, PostComponent]
})
export class ChadPageModule {}
