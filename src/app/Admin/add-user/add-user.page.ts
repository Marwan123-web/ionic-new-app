import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as dateFormat from 'dateformat';
@Component({
  selector: 'app-add-user',
  templateUrl: 'add-user.page.html',
  styleUrls: ['add-user.page.scss']
})
export class addUserPage implements OnInit {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: any;
  types: Array<string>;
  type: any;
  dataOfJoin: any;
  selectedLanguage: string;
  validations_form: FormGroup;
  customPopoverOptions: any;
  showPassword = false;
  passwordToggleIcon = "eye";
  // id, name, email, password
  constructor(private adminservices: AdminservicesService, private alertservice: AlertService, private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService, private _router: Router
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  onSelectChange(event: any) {
    //update the ui
    this.role = event.target.value;
  }
  addUser() {
    let id1 = document.getElementById("idinput2") as HTMLInputElement;
    let name1 = document.getElementById("nameinput") as HTMLInputElement;
    let email1 = document.getElementById("emailinput") as HTMLInputElement;
    let password1 = document.getElementById("passwordinput2") as HTMLInputElement;
    if (this.role == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select User Type');
    }
    else {
      this._id = id1.value, this.name = name1.value, this.email = email1.value, this.password = password1.value;
      var now = new Date();
      this.dataOfJoin = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      this.adminservices.addUser(this._id, this.name, this.email, this.password, this.role, this.dataOfJoin).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", res.msg);
        this.validations_form.reset();
        this.navigateToUsers();
      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
      }
      );
    }
  }

  navigateToUsers() {
    this._router.navigate(['/users']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  // static validID(fc: FormControl) {

  //   if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
  //     return {
  //       validID: true
  //     };
  //   } else {
  //     return null;
  //   }
  // }


  ngOnInit(): void {
    this.types = [
      "student",
      "professor",
      "admin"
    ];
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.max(20301800),
        Validators.min(20201800),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.com')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      type: new FormControl(this.types[0], Validators.required),
    });


  }

  validation_messages = {
    'id': [
      { type: 'maxlength', message: 'ID cannot be more than 8 characters long.' },
      { type: 'minlength', message: 'ID must be at least 8 characters long.' },
      { type: 'max', message: 'ID cannot be more than 20301800.' },
      { type: 'min', message: 'ID must be at least 20201800.' },
      { type: 'required', message: 'ID is required.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ]
  };


}
