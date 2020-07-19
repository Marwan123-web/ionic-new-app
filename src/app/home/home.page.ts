import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from '../services/adminservices.service';
import { AlertService } from '../services/alert.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, Role } from '../_models';
import * as dateFormat from 'dateformat';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage implements OnInit {
  currentUser: User;
  selectedLanguage: string;
  validations_form: FormGroup;
  postdata: any;
  dataOfPost: string;
  body: any;
  hidebutton: boolean;
  posts: any;
  sub: any;

  constructor(
    private _router: Router,
    private authenticationService: AuthService,
    private adminservices: AdminservicesService,
    private _Activatedroute: ActivatedRoute,
    private translateConfigService: TranslateConfigService,
    private alertservice: AlertService,
    private formBuilder: FormBuilder,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
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
  get isTeacherOrAdmin() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Admin);
  }
  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  onSelectChange(event: any) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      //update the ui
      this.posts = event.target.value;
      if (this.posts == '') {
        this.getPosts();
        this.hidebutton = false;
      }
      else if (this.posts == 'myposts') {
        this.getmyPosts();
        this.hidebutton = true;
      }
    });

  }
  addPost() {
    // var dateFormat = require('dateformat');
    var now = new Date();
    this.dataOfPost = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    let content = document.getElementById("contentTextArea") as HTMLInputElement;
    this.body = content.value,
      this.adminservices.addPost(this.currentUser._id, this.currentUser.name, this.body, this.dataOfPost).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", res.msg);
        this.validations_form.reset();
        this.getPosts();
      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
      });
  }
  deletePost(postid) {
    this.adminservices.deletePost(postid).subscribe(res => {
      this.alertservice.showAlert("&#xE876;", "success", res.msg);
      this.getmyPosts();
    }, err => {
      this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
    }
    );
  }
  getPosts() {
    this.adminservices.getPosts().subscribe(res => {
      this.postdata = res;
    }, err => {
      this.postdata = err
    }
    );
  }
  getmyPosts() {
    this.adminservices.getmyPosts(this.currentUser._id).subscribe(res => {
      this.postdata = res;
    }, err => {
      this.postdata = err
    }
    );
  }


  ngOnInit(): void {
    this.getPosts();
    this.validations_form = this.formBuilder.group({
      post: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
      ])),
    });
  }
}
