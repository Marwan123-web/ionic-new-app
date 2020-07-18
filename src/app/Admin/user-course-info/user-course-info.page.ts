import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-course-info',
  templateUrl: 'user-course-info.page.html',
  styleUrls: ['user-course-info.page.scss']
})
export class userCourseInfoPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  private _id: string;
  semester_time: string;
  selectedLanguage: string;
  courseCode: string;
  obj: object;


  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

  }
  GradeTypeGrade: any;
  studentgrades: any;
  gradetype: any;
  arrofdata: Array<any> = [];
  x: any;
  mydata: any;
  courseTotalGrades: any;
  usertotalgrades: any;
  sub: any;
  //   <ion-item id="user-profile-info-grade" *ngFor="let grade of arrofdata">
  //   <ion-label>
  //       <h2>{{grade.gradeType}}</h2>
  //       <h3>{{grade.score}}</h3>
  //   </ion-label>
  // </ion-item>
  // <ion-item id="user-profile-info-total">
  //   <ion-label>
  //       <h2 *ngIf="courseTotalGrades">Total({{courseTotalGrades.totalGrades}})</h2>
  //       <h3 *ngIf="usertotalgrades">{{usertotalgrades.totalGrades.totalGrades}}</h3>
  //   </ion-label>
  // </ion-item>
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.totalCourseSemesterGrades(this.courseCode, this.semester_time).subscribe(res => {
        this.courseTotalGrades = res;

      }, err => {
        this.courseTotalGrades = err;


      });

      this.adminservices.semesterStudentTotalGrades(this._id, this.courseCode, this.semester_time).subscribe(res => {
        this.usertotalgrades = res;


      }, err => {
        this.usertotalgrades = err;

      });

      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.GradeTypeGrade = res.findsemesterdata.semesters[0].grades;
        for (let i = 0; i < this.GradeTypeGrade.length; i++) {
          this.adminservices.getMyCourseSemesterGrades(this._id, this.courseCode, this.semester_time, this.GradeTypeGrade[i].type).subscribe(res => {
            this.studentgrades = res;
            if (this.studentgrades) {
              this.arrofdata.push(this.studentgrades);

            }
          }, err => {
            this.studentgrades = err;
          });

        }
      }, err => {
        this.GradeTypeGrade = err;
      }
      );
    });

  }
}
