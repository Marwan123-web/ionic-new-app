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

@Component({
  selector: 'app-delete-material',
  templateUrl: './delete-material.page.html',
  styleUrls: ['./delete-material.page.scss'],
})
export class DeleteMaterialPage implements OnInit {


  currentUser: User;
  currentCourseSemester: Semester;
  _id: string;
  coursedata: any;
  currentCourse: Course;
  taskType: string;
  coursesemesterdata: any;
  selectedLanguage: string;
  validations_form: FormGroup;
  sub: any;
  courseCode: string;
  semester_time: string;
  myform: any;
  customPopoverOptions: any;
  task: any;
  materialType: any;
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
  onSelectChange(event: any) {
    //update the ui
    this.materialType = event.target.value;
  }
  DeleteMaterial() {
    if (this.materialType == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Material Name');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this.courseCode = params.get('courseCode');
        this.semester_time = params.get('semester_time');
        this.teacherservices.deleteCourseSemesterMaterial(this.courseCode, this.semester_time, this.materialType).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          this.validations_form.reset();
          this.navigateToMaterials();
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        }
        );
      });
    }
  }
  navigateToMaterials() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.router.navigate(['/course/semester/materials/' + this.courseCode, this.semester_time])
    });
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  coursedatafun() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
      }, err => {
        this.coursedata = err
      }
      );
      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.findsemesterdata.semesters[0].materials;
      }, err => {
        this.coursesemesterdata = err
      }
      );
    });
  }
  ngOnInit(): void {

    this.coursedatafun();
    this.validations_form = this.formBuilder.group({

    });
  }



}