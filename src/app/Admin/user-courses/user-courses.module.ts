import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userCoursesPage } from './user-courses.page';

import { userCoursesPageRoutingModule } from './user-courses-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    userCoursesPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [userCoursesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class userCoursesPageModule {}
