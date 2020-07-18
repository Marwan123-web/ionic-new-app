import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialsPageRoutingModule } from './materials-routing.module';

import { MaterialsPage } from './materials.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialsPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [MaterialsPage]
})
export class MaterialsPageModule {}
