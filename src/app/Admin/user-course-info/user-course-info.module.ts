import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userCourseInfoPage } from './user-course-info.page';

import { userCourseInfoPageRoutingModule } from './user-course-info-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    userCourseInfoPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [userCourseInfoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class userCourseInfoPageModule {}
