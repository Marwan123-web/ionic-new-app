
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { NavController } from '@ionic/angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students-grade',
  templateUrl: 'students-grade.page.html',
  styleUrls: ['students-grade.page.scss']
})
export class studentsGradePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
  things: any[][];
  coursedata: any;
  useragrade: any;
  courseusers: any;
  userdata: any;
  usertotalgrades: any;
  arrayofusersdata: Array<object> = [];
  usertotalgradestotal: Array<object> = [];
  fakedata: any;
  courseTotalGrades: any;
  courseDataCode: any;
  semester_time: string;
  courseSemesterDataCode: any;
  selectedLanguage: string;
  courseCode: string;
  currentUser: User;
  checkSemesterStatus: any;
  hidebutton: boolean;
  displayedColumns: string[] = ['_id', 'name', 'fdata', 'totalGrades'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private authenticationService: AuthService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.things = [];
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  sub: any;
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
  getcoursedata(x, y) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursedata = res.findsemesterdata.semesters[0].grades;
        this.courseDataCode = res.findsemesterdata;
        this.courseSemesterDataCode = res.findsemesterdata.semesters[0];
        this.checkSemesterStatus = this.courseSemesterDataCode.semester_status;
        if (this.checkSemesterStatus == "finished") {
          this.hidebutton = false;
        }
        else if (this.checkSemesterStatus == "open") {
          this.hidebutton = true;
        }
        // this.courseTotalGrades = this.coursedata.length;
        for (let i = 0; i < this.coursedata.length; i++) {
          this.adminservices.semesterStudentsGradesheet(x, this.courseCode, this.semester_time, this.coursedata[i].type).subscribe(res => {
            // this.fakedata = { "_id": "5eba5bb7900576e5c44f34b2", "studentId": x, "courseId": this.currentCourse.courseCode, "gradeType": this.coursedata[i].type, "score": 100, "__v": 0 }
            this.useragrade = res.score;
            this.things[y][i] = this.useragrade;
          }, err => {
            this.useragrade = err;
          });

        }
      }, err => {
        this.coursedata = err;
      });
    });

  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.totalCourseSemesterGrades(this.courseCode, this.semester_time).subscribe(res => {
        this.courseTotalGrades = res;
        this.dataSource = new MatTableDataSource(res);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.courseTotalGrades = err;
        this.dataSource = new MatTableDataSource(err);
      });
      this.adminservices.getCourseSemesterStudentsSheet(this.courseCode, this.semester_time).subscribe(res => {
        this.courseusers = res;
        this.dataSource = new MatTableDataSource(res);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let y = 0; y < this.courseusers.length; y++) {
          this.adminservices.profile(this.courseusers[y]._id).subscribe(res => {
            this.userdata = res;
            this.dataSource = new MatTableDataSource(res);
            // Assign the paginator *after* dataSource is set
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.adminservices.semesterStudentTotalGrades(this.courseusers[y]._id, this.courseCode, this.semester_time).subscribe(res => {
              this.usertotalgrades = res;
              this.dataSource = new MatTableDataSource(res);
              // Assign the paginator *after* dataSource is set
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.usertotalgradestotal[y] = this.usertotalgrades;
            }, err => {
              this.usertotalgrades = err;
              this.dataSource = new MatTableDataSource(err);
            });

            this.arrayofusersdata[y] = this.userdata;
            this.things[y] = [];
            this.getcoursedata(this.userdata._id, y);
          }, err => {
            this.userdata = err;
            this.dataSource = new MatTableDataSource(err);
          });

        }
      }, err => {
        this.courseusers = err;
        this.dataSource = new MatTableDataSource(err);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
