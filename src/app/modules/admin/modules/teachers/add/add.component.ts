import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import {
  addFormConfig,
  educationFormConfig,
  experienceFormConfig,
  personalInformationFormConfig,
} from '../teacher.constant';
import { CreateTeacherProfile, TeacherProfile, TeachersEducation, TeachersExperience } from '@sc-models/core';
import { DynamicListOptions } from '@sc-models/form';
import { FormComponent } from '@sc-forms/form.component';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { map, of } from 'rxjs';
import { FormArrayComponent } from '@sc-forms/form-array/form-array.component';

@Component({
  selector: 'sc-add',
  standalone: false,

  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements AfterViewInit {
  readonly credFormComponents = viewChild.required<FormComponent<TeacherProfile & {userName: string; password: string}>>('credForm');
  readonly personalInfoFormComponent = viewChild.required<FormComponent<TeacherProfile>>('personalInfoForm');
  readonly educationFormComponents = viewChild.required<FormArrayComponent<TeachersEducation>>('educationForm');
  readonly experienceFormComponents = viewChild.required<FormArrayComponent<TeachersExperience>>('experience');

  private readonly sharedStore = inject(SharedStoreService);
  private readonly adminService = inject(AdminService);

  readonly personalInformationFormConfig = personalInformationFormConfig;
  readonly educationFormConfig = educationFormConfig;
  readonly experienceFormConfig = experienceFormConfig;
  readonly addFormConfig = addFormConfig;

  readonly dynamicOptions: DynamicListOptions<keyof TeacherProfile> = {};

  currentTabIndex = 0;

  image: File | null = null;
  imagePath!: string;

  ngAfterViewInit(): void {
    this.handleDynamicOptions();
  }

  handleStepIndex() {
    switch (this.currentTabIndex) {
      case 0:
        if (this.personalInfoForm.valid) {
          this.currentTabIndex = 1;
        } else {
          this.personalInfoForm.markAllAsTouched();
        }
        break;
      case 1:
        if (this.educationForms.valid && this.experienceForms.valid) {
          this.save()
        } else {
          this.educationForms.markAllAsTouched();
          this.experienceForms.markAllAsTouched();
        }
        this.currentTabIndex = 1;
        break;
      case 2:
        this.currentTabIndex = 1;
        break;
      default:
        break;
    }
  }

  handleDynamicOptions() {
    const formControls = this.personalInfoForm.controls;
    this.dynamicOptions['state'] = this.sharedStore.addressStates$.pipe(
      map((v) => v.map((d) => ({ key: d, label: d }))),
    );
    this.dynamicOptions['city'] = of([]);
    this.dynamicOptions['pincode'] = of([]);

    formControls.state.valueChanges.subscribe((state) => {
      if (state) {
        formControls.city.setValue('', { emitEvent: false });
        formControls.pincode.setValue('', { emitEvent: false });
        formControls.city.enable({ emitEvent: false });
        formControls.pincode.disable({ emitEvent: false });
        this.dynamicOptions['pincode'] = of([]);
        this.dynamicOptions['city'] = this.sharedStore
          .addressDistrict$(state)
          .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));
      }
    });
    formControls.city.valueChanges.subscribe((city) => {
      const state = formControls.state.value;
      formControls.pincode.setValue('', { emitEvent: false });
      this.dynamicOptions['pincode'] = of([]);
      if (state && city && formControls.city.enabled) {
        formControls.pincode.enable({ emitEvent: false });
        this.dynamicOptions['pincode'] = this.sharedStore
          .addressPincode$(state, city)
          .pipe(map((v) => v.map((d) => ({ key: d, label: d }))));
      }
    });
  }

  save() {
    const teacherProfile: CreateTeacherProfile = {
      ...(this.personalInfoForm.value as TeacherProfile),
      ...(this.credForms.value as TeacherProfile & {userName: string; password: string}),
      image: this.image,
      teachersEducation: this.educationForms.value as TeachersEducation[],
      teachersExperience: this.experienceForms.value as TeachersExperience[],
    }
    this.adminService.createTeachersProfile(teacherProfile);
  }

  get personalInfoForm() {
    return this.personalInfoFormComponent().formGroup;
  }

  get educationForms() {
    return this.educationFormComponents().formArray;
  }

  get experienceForms() {
    return this.experienceFormComponents().formArray;
  }

  get credForms() {
    return this.credFormComponents().formGroup;
  }
}
