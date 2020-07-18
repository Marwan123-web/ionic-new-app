import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { studentsGradePage } from './students-grade.page';

import { studentsGradePageRoutingModule } from './students-grade-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    studentsGradePageRoutingModule,
    MatExpansionModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    TranslateModule.forChild(),
  ],
  declarations: [studentsGradePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class studentsGradePageModule {}
