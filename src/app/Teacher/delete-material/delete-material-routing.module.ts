import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMaterialPage } from './delete-material.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMaterialPageRoutingModule {}
