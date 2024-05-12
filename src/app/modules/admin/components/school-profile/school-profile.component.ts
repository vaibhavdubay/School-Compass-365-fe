import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { Class, SchoolProfile } from '@sc-models/core';
import { schoolFormConfig } from '@sc-modules/admin/constants/admin.constant';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { school as schoolActions } from '@sc-modules/admin/state/action';

@Component({
  selector: 'sc-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrl: './school-profile.component.scss',
})
export class SchoolProfileComponent implements AfterViewInit {
  formConfig = schoolFormConfig;
  @ViewChild('form') form!: FormComponent<SchoolProfile>;
  schoolProfile?: SchoolProfile;

  items: Class[] = [];
  basket: Class[] = [];
  constructor(
    private sharedStore: SharedStoreService,
    private readonly adminService: AdminService,
    public readonly screenObserver: ScreenSizeObserver,
  ) {
    this.sharedStore.School$.subscribe((schoolProfile) => {
      this.schoolProfile = schoolProfile;
      this.basket = [...schoolProfile.classes].sort(
        (a, b) => a.order - b.order,
      );
      if (this.form) this.form.formValue = schoolProfile;
    });
    this.adminService.classes$.subscribe((classes) => {
      this.items = [
        ...classes.filter(
          (c) => !this.basket.some((c2) => c.order == c2.order),
        ),
      ];
      if (!this.basket.length) {
        this.items = [...classes];
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.schoolProfile) this.form.formValue = this.schoolProfile;
  }

  drop(event: CdkDragDrop<Class[]>) {
    if (event.previousContainer != event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.items = this.items.sort((a, b) => a.order - b.order);
    this.basket = this.basket.sort((a, b) => a.order - b.order);

    const [start, end] = [
      this.basket[0].order,
      this.basket[this.basket.length - 1].order,
    ];
    const items = this.items.filter((a) => a.order > start && a.order < end);
    this.items = this.items.filter(
      (a) => !items.some((item) => item.order == a.order),
    );
    this.basket = this.basket.concat(items);
    this.items = this.items.sort((a, b) => a.order - b.order);
    this.basket = this.basket.sort((a, b) => a.order - b.order);
  }

  updateSchoolProfile() {
    console.log(this.form.formGroup.value);
    const school = {
      ...this.schoolProfile,
      ...this.form.formGroup.value,
      classes: this.basket,
      id: this.schoolProfile?.id,
    };
    this.adminService.dispatch(schoolActions.updateSchool({ school }));
  }
}
