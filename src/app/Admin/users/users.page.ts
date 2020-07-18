import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// declare var $: any;
@Component({
  selector: 'app-admin-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class usersPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  usersdata: any[];
  role: any;
  selectedLanguage: string;
  sub: any;
  customPopoverOptions: any;
  users: any;
  displayedColumns: string[] = ['_id', 'name', 'email'];
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
      this.role = event.target.value;
      if (this.role == '') {
        this.adminservices.getUsers().subscribe(res => {
          this.usersdata = res;
          this.dataSource = new MatTableDataSource(res);
          // Assign the paginator *after* dataSource is set
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.usersdata = err;
          this.dataSource = new MatTableDataSource(err);
        }
        );
      }
      else {
        this.adminservices.getUsersByRole(this.role).subscribe(res => {
          this.usersdata = res;
          this.dataSource = new MatTableDataSource(res);
          // Assign the paginator *after* dataSource is set
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.usersdata = err;
          this.dataSource = new MatTableDataSource(err);
        }
        );
      }
    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getUsers() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.adminservices.getUsers().subscribe(res => {
        this.usersdata = res;
        this.dataSource = new MatTableDataSource(res);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.usersdata = err;
        this.dataSource = new MatTableDataSource(err);
      }
      );
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
