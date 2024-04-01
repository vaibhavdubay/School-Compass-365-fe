import { Component, ViewChild } from '@angular/core';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { FormConfig } from '@sc-models/form';
import { FormComponent } from '@sc-forms/form.component';
import { sideNavConfig } from '../constants/admin.constant';
import { TableConfig } from '@sc-models/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'sc-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  formConfig: FormConfig = [
    {
      elementType: 'text',
      element: {
        key: 'firstName',
        validateAs: 'text',
        required: true,
        label: 'First Name',
        cssClass: 'col-md-4',
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'lastName',
        validateAs: 'text',
        cssClass: 'col-md-4',
        label: 'Last Name',
      },
    },
    {
      elementType: 'text',
      element: {
        key: 'email',
        validateAs: 'email',
        cssClass: 'col-md-4',
        value: 'sirvaibhavdubay@gmail.com',
        label: 'Email',
      },
    },
    {
      elementType: 'date',
      element: {
        key: 'date',
        label: 'Date',
      },
    },
    {
      elementType: 'button-group',
      element: {
        key: 'submit',
        cssClass: 'col-md-12 text-center',
        buttons: [
          {
            elementType: 'button',
            element: {
              key: 'submit',
              type: 'submit',
              cssClass: 'col',
              theme: 'raised',
              color: 'primary',
              label: 'Submit',
            },
          },
          {
            elementType: 'button',
            element: {
              key: 'reset',
              theme: 'raised',
              cssClass: 'col',
              type: 'reset',
              color: 'accent',
              label: 'Reset',
            },
          },
        ],
        label: 'Submit',
      },
    },
  ];
  tableData = ELEMENT_DATA;
  tableConfig: TableConfig<PeriodicElement> = {
    columns: [
      {
        columnDef: 'position',
        header: 'Index',
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: PeriodicElement) =>
          `${element.name} (${element.symbol})`,
      },
      {
        columnDef: 'weight',
        header: 'Weight',
        formElement: {
          elementType: 'button-group',
          element: {
            display: 'row',
            buttons: [
              {
                elementType: 'button',
                element: {
                  key: 'view',
                  label: 'visibility',
                  type: 'button',
                  theme: 'icon',
                },
              },
              {
                elementType: 'button',
                element: {
                  key: 'edit',
                  label: 'edit',
                  type: 'button',
                  theme: 'icon',
                },
              },

              {
                elementType: 'button',
                element: {
                  key: 'delete',
                  label: 'delete',
                  type: 'button',
                  theme: 'icon',
                },
              },
            ],
            key: 'actions',
            label: 'actions',
          },
        },
      },
    ],
    pagination: {
      pageSizeOptions: [5, 10, 20, 30],
    },
    sort: {
      column: 'name',
      direction: 'asc',
    },
  };

  navConfig = sideNavConfig;

  getButtonClick(event: any) {
    console.log(event);
  }

  @ViewChild('form') formComponent!: FormComponent<{
    firstName: string;
    lastName: string;
    email: string;
  }>;

  get FormGroup() {
    return this.formComponent?.formGroup;
  }

  constructor(private sharedStoreService: SharedStoreService) {
    sharedStoreService.loggedInUser$.subscribe((user) => {
      this.FormGroup?.patchValue(user);
    });
  }
}
