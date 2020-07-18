import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { User, Role } from './_models';
import { Router } from '@angular/router';
import { TranslateConfigService } from './services/translate-config.service';
import { AlertService } from './services/alert.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  public darkMode: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: AuthService,
    private translateConfigService: TranslateConfigService,
    private alertservice: AlertService
  ) {
    this.initializeApp();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.platform.ready().then(() => {
      this.translateConfigService.setLanguage(localStorage["myConfig"]);
    });
    this.darkMode = JSON.parse(localStorage.getItem('isThemeMode'));
    this.isMode();
  }

  public isMode() {
    // console.log(this.darkMode); // <-- note we can just set the current value of this.darkMode as this changes with the toggle
    if (window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
      // console.log('🎉 Dark mode is supported');
      // console.log(window.matchMedia('(prefers-color-scheme: dark)'));
    }
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('isThemeMode', JSON.stringify(this.darkMode));
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
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.alertservice.showAlert("&#xE876;", "success", "You have successfully logged out!");
  }
  title = 'smartCollege';

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
