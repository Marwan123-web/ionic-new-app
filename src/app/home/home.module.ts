import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { homePage } from './home.page';

import { homePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    homePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [homePage]
})
export class homePageModule { }
