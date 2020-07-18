import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { TranslateConfigService } from '../services/translate-config.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { User, Role } from '../_models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentUser: User;
  public darkMode: boolean;
  selectedLanguage: any;
  DefaultLangValue: string;
  returnUrl: string;
  constructor(private app: AppComponent, private translateConfigService: TranslateConfigService, private authenticationService: AuthService,
    public router: Router, private alertservice: AlertService) {
    this.darkMode = JSON.parse(localStorage.getItem('isThemeMode'));
    this.isMode();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.currentUser = this.authenticationService.currentUserValue;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
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

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    localStorage.setItem("myConfig", this.selectedLanguage);
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.alertservice.showAlert("&#xE876;", "success", "You have successfully logged out!");
  }

  ngOnInit() {
  }

}
