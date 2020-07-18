import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { NavController } from '@ionic/angular';

// declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: 'courses.page.html',
  styleUrls: ['courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class adminCoursesPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  coursedata: any[];
  department: any;
  selectedLanguage: string;
  sub: any;
  displayedColumns: string[] = ['courseCode', 'courseName', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  onSelectChange(event: any) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {

      //update the ui
      this.department = event.target.value;
      if (this.department == '') {
        this.adminservices.getCourses().subscribe(res => {
          this.coursedata = res;
          this.dataSource = new MatTableDataSource(res);
          // Assign the paginator *after* dataSource is set
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.coursedata = err;
          this.dataSource = new MatTableDataSource(err);
        });
      }
      else if (this.department == 'active') {
        this.getActiveCourses();
      }
      else {
        this.adminservices.getDepartmentCourses(this.department).subscribe(res => {
          this.coursedata = res;
          this.dataSource = new MatTableDataSource(res);
          // Assign the paginator *after* dataSource is set
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.coursedata = err;
          this.dataSource = new MatTableDataSource(err);
        });
      }
    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getActiveCourses() {
    this.adminservices.getActiveCourses().subscribe(res => {
      this.coursedata = res;
      this.dataSource = new MatTableDataSource(res);
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.coursedata = err;
      this.dataSource = new MatTableDataSource(err);
    });
  }
  getCourses() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.adminservices.getCourses().subscribe(res => {
        this.coursedata = res;
        this.dataSource = new MatTableDataSource(res);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.coursedata = err;
        this.dataSource = new MatTableDataSource(err);
      });
    });
  }


  ngOnInit(): void {
    this.getCourses();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}