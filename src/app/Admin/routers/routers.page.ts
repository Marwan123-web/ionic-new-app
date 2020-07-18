import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-routers',
  templateUrl: './routers.page.html',
  styleUrls: ['./routers.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoutersPage implements OnInit {

  routersdata: any;
  selectedLanguage: string;
  sub: any;

  displayedColumns: string[] = ['locationId', 'locationName', 'routerAddress'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController,
    private changeRef: ChangeDetectorRef
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getRouters() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {

      this.adminservices.getRouters().subscribe(res => {
        this.routersdata = res;
        this.dataSource = new MatTableDataSource(res);
      }, err => {
        this.routersdata = err;
        this.dataSource = new MatTableDataSource(err);
      });
    });

  }
  ngOnInit(): void {
    this.getRouters();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
