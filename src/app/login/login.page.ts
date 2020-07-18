import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User, Role } from '../_models';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage implements OnInit {
  Id: any;
  password: any;
  currentUser: User;
  returnUrl: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  showPassword = false;
  passwordToggleIcon = "eye";

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute, private alertservice: AlertService,
    private translateConfigService: TranslateConfigService, private formBuilder: FormBuilder) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // get return url from route parameters or default to '/'
    if (this.authservice.currentUserValue) {
      // if (this.currentUser.role === Role.Admin) {
      //   this.router.navigate(['/courses']);
      // } else if (this.currentUser.role === Role.Student || this.currentUser.role === Role.Teacher) {
      //   this.router.navigate(['/mycourses']);
      // }
      this.router.navigate(['/home']);
    }
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }


  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.max(20301800),
        Validators.min(20201800),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
      ])),
    });

  }

  loginUser() {
    let idinput = document.getElementById("idinput") as HTMLInputElement;
    let passwordinput = document.getElementById("passwordinput") as HTMLInputElement;
    this.Id = idinput.value, this.password = passwordinput.value;
    this.authservice.login(this.Id, this.password).pipe(first()).subscribe(res => {
      this.alertservice.showAlert("&#xE876;", "success", "You have successfully logged in!");
      this.validations_form.reset();
      this.router.navigate([this.returnUrl]);

    }, err => {
      this.alertservice.showAlert("&#xE5CD;", "error", "ID or password is incorrect. please try logging in again!");
    }
    );

  }

  validation_messages = {
    'id': [
      { type: 'maxlength', message: 'ID cannot be more than 8 characters long.' },
      { type: 'minlength', message: 'ID must be at least 8 characters long.' },
      { type: 'max', message: 'ID cannot be more than 20301800.' },
      { type: 'min', message: 'ID must be at least 20201800.' },
      { type: 'required', message: 'ID is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
    ]
  };
}
