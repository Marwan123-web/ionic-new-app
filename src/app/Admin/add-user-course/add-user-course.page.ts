import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-user-course',
  templateUrl: 'add-user-course.page.html',
  styleUrls: ['add-user-course.page.scss']
})
export class addUserCoursePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  courseCode: string;
  course: any;
  courses: string;
  allCourses: any;
  selectedLanguage: string;
  validations_form: FormGroup;
  currentUser: User;
  customPopoverOptions: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private alertservice: AlertService,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthService,
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.currentUser = this.authenticationService.currentUserValue;
  }
  sub: any;
  onSelectChange(event: any) {
    //update the ui
    this.course = event.target.value;
  }
  navigateToUserCourses() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this._router.navigate(['/user/courses/' + this._id]);
    });
  }
  addUserCourse() {
    if (this.course == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Course');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this._id = params.get('id');
        this.adminservices.addUserCourse(this._id, this.course, this.currentUser._id).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          this.courses = null;
          this.navigateToUserCourses();
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        }
        );
      });
    }
  }
  deleteUserCourse() {
    if (this.course == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Course');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this._id = params.get('id');
        this.adminservices.deleteUserCourse(this._id, this.course).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        }
        );
      });
    }
  }
  goBack() {
    window.history.back();
  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.adminservices.getActiveCourses().subscribe(res => {
      this.allCourses = res;
    }, err => {
      this.allCourses = err;
    }
    );



  }

  validation_messages = {

  };

}
