import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageRouterPage } from './manage-router.page';

const routes: Routes = [
  {
    path: '',
    component: ManageRouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRouterPageRoutingModule {}
