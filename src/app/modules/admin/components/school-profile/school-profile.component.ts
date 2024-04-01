import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { SchoolProfile } from '@sc-models/core';
import { ButtonClickEvent } from '@sc-models/form';
import { schoolFormConfig } from '@sc-modules/admin/constants/admin.constant';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrl: './school-profile.component.scss',
})
export class SchoolProfileComponent {
  formConfig = schoolFormConfig;
  schoolProfile!: SchoolProfile;

  @ViewChild('form') formComponent!: FormComponent<{
    address1: string;
    address2: string;
    city: string;
    currentAcademicYear: string;
    establishedYear: string;
    name: string;
    pincode: string;
    schoolCode: string;
    schoolDISECode: string;
    state: string;
  }>;

  get FormGroup() {
    return this.formComponent?.formGroup;
  }

  constructor(private sharedStoreService: SharedStoreService) {
    sharedStoreService.loggedInUser$.subscribe((user) => {
      this.schoolProfile = user.school;
      this.FormGroup?.patchValue(user.school);
    });
  }

  eventHandler(event: ButtonClickEvent) {
    switch (event.key) {
      case 'reset':
        return this.FormGroup?.patchValue(this.schoolProfile);
      case 'submit':
        this.submit();
    }
  }

  submit() {}
}
