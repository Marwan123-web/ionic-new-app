import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-delete-course-grade',
  templateUrl: 'delete-course-grade.page.html',
  styleUrls: ['delete-course-grade.page.scss']
})
export class deleteCourseGradePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  gradetype: any;
  grade: any;
  types: Array<string>;
  coursedata: any;
  semester_time: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  courseCode: string;
  customPopoverOptions: any;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private alertservice: AlertService,
    private translateConfigService: TranslateConfigService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  sub: any;
  onSelectChange(event: any) {
    //update the ui
    this.gradetype = event.target.value;
  }

  deleteCourseGrade() {
    if (this.gradetype == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Grade Type');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this.courseCode = params.get('courseCode');
        this.semester_time = params.get('semester_time');
        this.adminservices.deleteCourseSemesterGrade(this.courseCode, this.semester_time, this.gradetype).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          this.navigateToCourseInfo();
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        }
        );
      });
    }
  }

  navigateToCourseInfo() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/info/' + this.courseCode, this.semester_time]);
    });
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  getcoursegrades() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursedata = res.findsemesterdata.semesters[0];
      }, err => {
        this.coursedata = err;
      }
      );
    });
  }

  ngOnInit(): void {
    this.getcoursegrades();
    this.types = [
      "Assignment",
      "Quiz 1",
      "Quiz 2",
      "Quiz 3",
      "Midterm",
      "Practice",
      "Final"
    ];
    this.validations_form = this.formBuilder.group({
      gradetype: new FormControl('', Validators.required),
    });
  }

  validation_messages = {

  };
}
