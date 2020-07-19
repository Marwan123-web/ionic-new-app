import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import * as dateFormat from 'dateformat';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.page.html',
  styleUrls: ['./upload-assignment.page.scss'],
})

export class UploadAssignmentPage implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  selectedLanguage: string;
  validations_form: FormGroup;
  dataOfAssignmentSolution: any;
  assignmentPath: string;
  sub: any;
  courseCode: string;
  semester_time: string;
  coursesdata: any;
  coursesemesterdata: any;
  noTasks: string;
  taskType: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private alertservice: AlertService,
    private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  onSelectChange(event: any) {
    //update the ui
    this.taskType = event.target.value;
  }
  uploadAssignment() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      var now = new Date();
      this.dataOfAssignmentSolution = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      let solutionPath = document.getElementById("assignmentsolutionPathinput") as HTMLInputElement;
      this.assignmentPath = solutionPath.value,
        this.teacherservices.uploadAssignment(this.currentUser._id, this.courseCode, this.semester_time, this.dataOfAssignmentSolution, this.taskType, this.assignmentPath).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          solutionPath.value = "";
          this.validations_form.reset();
          this.navigateToAssigments();
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        });
    });
  }
  navigateToAssigments() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.router.navigate(['/course/semester/assignments/' + this.courseCode, this.semester_time])
    });
  }
  courseassignments() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursesdata = res.course;
      }, err => {
        this.coursesdata = err
      }
      );
      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        if (res.findsemesterdata.semesters[0].tasks) {
          this.coursesemesterdata = res.findsemesterdata.semesters[0].tasks;
        }
      }, err => {
        this.coursesemesterdata = err
      }
      );
    });
  }
  ngOnInit() {
    this.courseassignments();
    this.validations_form = this.formBuilder.group({
      link: new FormControl('', Validators.required),
    });
  }
  validation_messages = {
    'link': [
      { type: 'required', message: 'Link is required.' }
    ]

  };
}
