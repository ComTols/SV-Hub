import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChadPage } from './chad.page';

const routes: Routes = [
  {
    path: '',
    component: ChadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChadPageRoutingModule {}
