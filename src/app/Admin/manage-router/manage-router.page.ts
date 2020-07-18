import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-router',
  templateUrl: './manage-router.page.html',
  styleUrls: ['./manage-router.page.scss'],
})
export class ManageRouterPage implements OnInit {

  locationId: string;
  locationName: string;
  routerAddress: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  constructor(private adminservices: AdminservicesService, private alertservice: AlertService, private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService, private _router: Router) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  updateRouter() {
    let locationId = document.getElementById("locationIdinput") as HTMLInputElement;
    let locationName = document.getElementById("locationNameinput") as HTMLInputElement;
    let routerAddress = document.getElementById("routerAddressinput") as HTMLInputElement;
    this.locationId = locationId.value, this.locationName = locationName.value, this.routerAddress = routerAddress.value;
    this.adminservices.updateRouter(this.locationId, this.locationName, this.routerAddress).subscribe(res => {
      this.alertservice.showAlert("&#xE876;", "success", res.msg);
      locationId.value = "";
      locationName.value = "";
      routerAddress.value = "";
      this.navigateToRouters();

    }, err => {
      this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
    }
    );

  }

  deleteRouter() {
    let locationId = document.getElementById("locationIdinput") as HTMLInputElement;
    this.locationId = locationId.value;
    this.adminservices.deleteRouter(this.locationId).subscribe(res => {
      this.alertservice.showAlert("&#xE876;", "success", res.msg);
      locationId.value = "";
      this.navigateToRouters();
    }, err => {
      this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
    }
    );
  }
  navigateToRouters() {
    this._router.navigate(['/routers']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  // static validCourseCode(fc: FormControl) {

  //   if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
  //     return {
  //       validCourseCode: true
  //     };
  //   } else {
  //     return null;
  //   }
  // }


  ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      locationId: new FormControl('', Validators.compose([
        Validators.maxLength(5),
        Validators.minLength(1),
        Validators.min(1),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      routerAddress: new FormControl('', Validators.compose([
        Validators.pattern("(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"),
        Validators.required
      ])),
    });


  }

  validation_messages = {
    'locationId': [
      { type: 'maxlength', message: 'Location ID cannot be more than 5 characters long.' },
      { type: 'minlength', message: 'Location ID must be at least 1 characters long.' },
      { type: 'min', message: 'Location ID must be at least 1.' },
      { type: 'required', message: 'Location ID is required.' },
    ],
    'name': [
      { type: 'required', message: 'Location Name is required.' }
    ],
    'routerAddress': [
      { type: 'required', message: 'Router Address is required.' },
      { type: 'pattern', message: 'You have entered an invalid IP address!' }
    ],

  };


}