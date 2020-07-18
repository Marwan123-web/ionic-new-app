import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutersPageRoutingModule } from './routers-routing.module';

import { RoutersPage } from './routers.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutersPageRoutingModule,
    MatExpansionModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    TranslateModule.forChild()

  ],
  declarations: [RoutersPage]
})
export class RoutersPageModule { }
