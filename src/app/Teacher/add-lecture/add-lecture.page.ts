import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
@Component({
  selector: 'app-add-lecture',
  templateUrl: 'add-lecture.page.html',
  styleUrls: ['add-lecture.page.scss']
})
export class addLecturePage implements OnInit {
  currentCourseSemester: Semester;
  currentUser: User;
  currentCourse: Course;
  _id: string;
  coursesdata: any;

  lectureNumber: string;
  lectureLocation: string;
  beaconId: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  sub: any;
  courseCode: string;
  semester_time: string;
  routersdata: any;
  locationaddress: any;
  locationName: any;
  hallslocation: any;
  coursesemesterlectures: any;
  lectureno: any;
  lectures: any;
  customPopoverOptions: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,

    private alertservice: AlertService,
    private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService,
    private wifiWizard2: WifiWizard2
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  onSelectChange(event: any) {
    //update the ui
    this.locationaddress = event.target.value;
    console.log(this.locationaddress)
  }
  AddLeacture() {
    if (this.locationaddress == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Lecture Location');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this.courseCode = params.get('courseCode');
        this.semester_time = params.get('semester_time');
        // this.lectureNumber = lectureNumber.value;
        this.teacherservices.addCourseSemesterLecture(this.courseCode, this.semester_time, this.lectureno, this.locationaddress).subscribe(res => {
          if (res) {
            this.teacherservices.addCourseSemesterAttendance(this.courseCode, this.semester_time, this.lectureno, this.locationaddress).subscribe(res => {
              this.alertservice.showAlert("&#xE876;", "success", res.msg);
              this.hallslocation = null;
              // lectureNumber.value = "";
            }, err => {
              this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
            })
          }
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        });
      });
    }
  }

  navigateTo() {
    this.router.navigate(['/courses']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getRouters() {
    this.teacherservices.getRouters().subscribe(res => {
      this.routersdata = res;
    }, err => {
      this.routersdata = err;
    });
  }
  getcoursedata() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');

      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterlectures = res.findsemesterdata.semesters[0].lectures
        this.lectures = this.coursesemesterlectures.length;
        if (this.coursesemesterlectures.length == 0) {
          this.lectureno = 1;
        }
        else {
          this.lectureno = this.coursesemesterlectures[this.lectures - 1].lectureNumber + 1;
        }
      }, err => {
        this.coursesemesterlectures = err
      }
      );
    });
  }
  ngOnInit(): void {
    // console.log(this.wifiWizard2.getConnectedSSID())
    this.getRouters();
    this.getcoursedata();


  }


}