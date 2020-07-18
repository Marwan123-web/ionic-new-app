import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-course-info',
  templateUrl: 'course-info.page.html',
  styleUrls: ['course-info.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class courseInfoPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  courseCode: any;
  coursedata: any;
  numberofusers: any;
  semester_time: string;
  coursesemesterdata: any;
  coursaSemesterGrades: any;
  selectedLanguage: string;
  currentUser: User;
  checkcoursesemesterstatus: any;
  checkSemesterStatus: any;
  hidebutton: any;
  statusbtn = document.getElementById("courses-semesters-info-statusBtn") as HTMLInputElement;
  checkcourseattendance: any;
  hideAttendancebutton: boolean;
  color: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController,
    public alertController: AlertController,

  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  sub: any;
  changeto: string;
  courseAttendanceStatusCahnge: any;

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }
  get isTeacherOrAdmin() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Admin);
  }
  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  // get courseOpen() {
  //   this.sub = this._Activatedroute.paramMap.subscribe(params => {
  //     this.courseCode = params.get('courseCode');
  //     this.semester_time = params.get('semester_time');
  //     this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
  //       this.checkcoursesemesterstatus = res.findsemesterdata.semesters[0];
  //     }, err => {
  //       this.checkcoursesemesterstatus = err;
  //     });
  //   });
  //   return this.checkcoursesemesterstatus.semester_status === "open";
  // }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  coursealldata() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');

      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.findsemesterdata.semesters[0];
        this.checkcourseattendance = this.coursesemesterdata.attendance_status;
        if (this.checkcourseattendance == "close") {
          this.color = 'danger';
          this.hideAttendancebutton = false;
        }
        else if (this.checkcourseattendance == "open") {
          this.color = 'success';
          this.hideAttendancebutton = true;
        }
        this.coursaSemesterGrades = res.findsemesterdata.semesters[0].grades;
        this.checkSemesterStatus = this.coursesemesterdata.semester_status
        if (this.checkSemesterStatus == "finished") {
          this.hidebutton = false;
        }
        else if (this.checkSemesterStatus == "open") {
          this.hidebutton = true;

        }
      }, err => {
      });
      this.adminservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
        // this.rows = res.course;
      }, err => {
        this.coursedata = err;
      }
      );
    });
  }
  changeCourseAttendanceStatusService(changeto) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.adminservices.changeCourseAttendanceStatus(this.courseCode, changeto).subscribe(res => {
        this.courseAttendanceStatusCahnge = res;
        this.coursealldata();
      }, err => {
        this.courseAttendanceStatusCahnge = err
      }
      );
    });
  }

  ngOnInit(): void {
    this.coursealldata();
  }

  changecourseattendancestatusfun(status) {
    if (status == "open") {
      this.changeto = "close"
      this.changeCourseAttendanceStatusService(this.changeto);
    }
    else if (status == "close") {
      this.changeto = "open"
      this.changeCourseAttendanceStatusService(this.changeto);
    }
  }
  activeFinishedAlert() {
    if (this.statusbtn.value == "open") {
      this.activeAlertConfirm();
    } else if (this.statusbtn.value == "close") {
      this.finishedAlert();
    }
  }

  async activeAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure that you want to do this action?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.changecourseattendancestatusfun(this.coursesemesterdata.attendance_status);
          }
        }
      ]
    });

    await alert.present();
  }

  async finishedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'This semester are already finished!!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
