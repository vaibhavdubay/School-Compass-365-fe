import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormComponent } from '@sc-forms/form.component';
import { SchoolProfile } from '@sc-models/core';
import { ListOption } from '@sc-models/form';
import { schoolFormConfig } from '@sc-modules/admin/constants/admin.constant';
import { ScreenSizeObserver } from 'src/app/core/service/screen.service';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrl: './school-profile.component.scss',
})
export class SchoolProfileComponent implements AfterViewInit {
  formConfig = schoolFormConfig;
  @ViewChild('form') form!: FormComponent<SchoolProfile>;
  schoolProfile?: SchoolProfile;

  items: ListOption[] = [];
  basket: ListOption[] = [];
  classOptions: ListOption[] = [];
  classes = {
    from: '',
    to: '',
  };
  constructor(
    private sharedStore: SharedStoreService,
    public readonly screenObserver: ScreenSizeObserver,
  ) {
    this.sharedStore.School$.subscribe((schoolProfile) => {
      this.schoolProfile = schoolProfile;
      this.classOptions = schoolProfile.classes.map(
        (_class) => new ListOption(_class['className']),
      );
      this.items = [...this.classOptions];
      if (this.form) this.form.formValue = schoolProfile;
    });
  }
  ngAfterViewInit(): void {
    if (this.schoolProfile) this.form.formValue = this.schoolProfile;
  }

  drop(event: CdkDragDrop<ListOption[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
