import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadAssignmentPageRoutingModule } from './upload-assignment-routing.module';

import { UploadAssignmentPage } from './upload-assignment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UploadAssignmentPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [UploadAssignmentPage]
})
export class UploadAssignmentPageModule { }
