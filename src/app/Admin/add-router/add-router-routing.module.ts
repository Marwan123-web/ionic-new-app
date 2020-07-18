import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRouterPage } from './add-router.page';

const routes: Routes = [
  {
    path: '',
    component: AddRouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRouterPageRoutingModule {}
