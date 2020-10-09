import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAccountPage } from './info-account.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAccountPageRoutingModule {}
