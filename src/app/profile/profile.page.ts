import { Component, OnInit } from '@angular/core';
import { User, Role } from '../_models';
import { AuthService } from '../services/auth.service';
import { AdminservicesService } from '../services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class profilePage implements OnInit {

  currentUser: User;
  userdata: any;
  nohours: string;
  usercredithours: any;
  sub: any;
  constructor(private authenticationService: AuthService,
    private adminservices: AdminservicesService,
    private _Activatedroute: ActivatedRoute,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
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
  profile() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {

      this.adminservices.profile(this.currentUser._id).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err;
      });
      this.adminservices.calculatMyCreditHours(this.currentUser._id).subscribe(res => {
        if (res == 0) {
          this.nohours = 'No Finished Hours Yet'
        }
        else {
          this.usercredithours = res;
        }
      }, err => {
        this.usercredithours = err
      });
    });
  }
  ngOnInit(): void {
    this.profile();

  }

}
