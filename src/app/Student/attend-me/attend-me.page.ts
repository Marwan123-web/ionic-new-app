import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
@Component({
  selector: 'app-attend-me',
  templateUrl: 'attend-me.page.html',
  styleUrls: ['attend-me.page.scss']
})
export class attendMePage implements OnInit {

  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  _id: string;
  coursesdata: any;

  lectureNumber: string;
  lectureLocation: string;
  beaconId: string;
  selectedLanguage: string;
  sub: any;
  courseCode: string;
  semester_time: string;
  coursesemesterlectures: any;
  lectureno: number;
  wifissid: any;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService, private alertservice: AlertService,
    private translateConfigService: TranslateConfigService,
    private wifiWizard2: WifiWizard2

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
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
  AttendMe() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.beaconId = '192.168.1.1'
      this.teacherservices.semesterAttendMe(this.currentUser._id, this.courseCode, this.semester_time, this.lectureno, this.wifissid).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", "You have successfully Attended!");
        // beaconId.value = "";
      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", "ID or password is incorrect. please try again!");
      }
      );
    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  getcoursedata() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');

      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterlectures = res.findsemesterdata.semesters[0].lectures
        if (this.coursesemesterlectures.length == 0) {
          this.lectureno = 1;
        }
        else {
          this.lectureno = this.coursesemesterlectures[this.coursesemesterlectures.length - 1].lectureNumber;
        }
      }, err => {
        this.coursesemesterlectures = err
      }
      );
    });
  }
  ngOnInit(): void {
    this.getcoursedata();
    this.wifissid = this.wifiWizard2.getConnectedSSID();
  }

}