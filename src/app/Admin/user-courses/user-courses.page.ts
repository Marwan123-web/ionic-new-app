import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-courses',
  templateUrl: 'user-courses.page.html',
  styleUrls: ['user-courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class userCoursesPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  usercoursesdata: any;
  usercoursesdata2: any;
  data: any[];
  coursedata: Array<any> = [];
  coursedataarr: Array<any> = [];
  x: any;


  arr: Array<object> = [];
  coursesdata: any;
  semesterdata: any;
  status: any;
  selectedLanguage: string;
  objectC: any;
  courseCode: any;
  semester_time: any;
  customPopoverOptions: any;
  courseType: any;
  userid: any;
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
  sub: any;
  onSelectChange(event: any) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      //update the ui
      this.status = event.target.value;
      this.adminservices.myCoursesByStatus(this._id, this.status).subscribe(res => {
        this.usercoursesdata = res;

      }, err => {
        this.usercoursesdata = err;
      }
      );
    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.userid = this._id
      this.adminservices.myCourses(this._id).subscribe(res => {
        this.usercoursesdata = res;
      }, err => {
        this.usercoursesdata = err;
      });
    });

  }

  // closCourse() {
  //   this.courseService.closeCourse();
  // }
  // openCourse(courseCode, semester_time) {
  //   this.sub = this._Activatedroute.paramMap.subscribe(params => {
  //     this._id = params.get('id');
  //     this._router.navigate(['/user/course/info/' + this._id, courseCode, semester_time])
  //   });
  // }

  // closSemester() {
  //   this.semesterserviceService.closeSemester();
  // }
  // openClickedUser() {
  //   this.sub = this._Activatedroute.paramMap.subscribe(params => {
  //     this._id = params.get('id');
  //     this._router.navigate(['/user/add-delete-course/' + this._id])
  //   });
  // }
}
