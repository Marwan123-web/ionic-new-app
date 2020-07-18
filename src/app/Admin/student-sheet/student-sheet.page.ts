import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { NavController } from '@ionic/angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-sheet',
  templateUrl: 'student-sheet.page.html',
  styleUrls: ['student-sheet.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class studentSheetPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  currentUser: User;
  _id: any;
  courseusers: any;
  semester_time: string;
  selectedLanguage: string;
  courseCode: string;
  displayedColumns: string[] = ['_id', 'name', 'email'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private authenticationService: AuthService, private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.currentUser = this.authenticationService.currentUserValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }


  sub: any;
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.getCourseSemesterStudentsSheet(this.courseCode, this.semester_time).subscribe(res => {
        this.courseusers = res;
        this.dataSource = new MatTableDataSource(res);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.courseusers = err;
        this.dataSource = new MatTableDataSource(err);
      }
      );
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
