import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddMaterialPageRoutingModule } from './add-material-routing.module';

import { AddMaterialPage } from './add-material.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMaterialPageRoutingModule,
    ReactiveFormsModule,

    TranslateModule.forChild()
  ],
  declarations: [AddMaterialPage]
})
export class AddMaterialPageModule { }
