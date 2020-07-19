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
  selector: 'app-add-task',
  templateUrl: 'add-task.page.html',
  styleUrls: ['add-task.page.scss']
})
export class addTaskPage implements OnInit {

  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  _id: string;
  coursesdata: any;

  taskType: string;
  taskPath: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  sub: any;
  courseCode: string;
  semester_time: string;
  dataOfDeadLineOfSolutions: any;
  deadLine: any;

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
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  AddTask() {
    let taskType = document.getElementById("taskTypeinput") as HTMLInputElement;
    let taskPath = document.getElementById("taskPathinput") as HTMLInputElement;
    let deadLine = document.getElementById("taskDeadLineinput") as HTMLInputElement;
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.taskType = taskType.value, this.taskPath = taskPath.value, this.deadLine = deadLine.value;
      var now = new Date(new Date().setDate(new Date().getDate() + parseInt(this.deadLine)));
      this.dataOfDeadLineOfSolutions = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      this.teacherservices.addCourseSemesterTask(this.courseCode, this.semester_time, this.taskType, this.taskPath, this.dataOfDeadLineOfSolutions).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", res.msg);
        taskType.value = "";
        taskPath.value = "";
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

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
    });
    var now = new Date(new Date().setDate(new Date().getDate() + 1))
    console.log(now)
  }

  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' }
    ],
    'link': [
      { type: 'required', message: 'Link is required.' }
    ],
    'deadline': [
      { type: 'required', message: 'Dead Line is required.' }
    ]

  };


}