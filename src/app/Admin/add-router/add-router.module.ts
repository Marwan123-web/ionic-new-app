import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddRouterPageRoutingModule } from './add-router-routing.module';

import { AddRouterPage } from './add-router.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRouterPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()

  ],
  declarations: [AddRouterPage]
})
export class AddRouterPageModule {}
