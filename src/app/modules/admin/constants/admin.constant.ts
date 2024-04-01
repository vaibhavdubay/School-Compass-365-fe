import { NavItem } from '@sc-models/core';
import { FormConfig } from '@sc-models/form';

export const sideNavConfig: NavItem[] = [
  {
    icon: 'person',
    label: 'Dashboard',
    routerLink: ['./'],
  },
];

export const schoolFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'name',
      validateAs: 'text',
      cssClass: 'col-md-6',
      label: 'Name',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'schoolCode',
      validateAs: 'text',
      cssClass: 'col-md-3',
      label: 'School Code',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'schoolDISECode',
      validateAs: 'text',
      cssClass: 'col-md-3',
      label: 'School DISE Code',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'address1',
      validateAs: 'text',
      required: true,
      label: 'Address1',
      cssClass: 'col-md-12',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'address2',
      validateAs: 'text',
      cssClass: 'col-md-12',
      label: 'Address2',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'establishedYear',
      validateAs: 'number',
      cssClass: 'col-md-3',
      label: 'Established Year',
      minLength: 4,
      maxLength: 4,
      readonly: true,
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'state',
      validateAs: 'text',
      cssClass: 'col-md-3',
      label: 'State',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'city',
      validateAs: 'text',
      cssClass: 'col-md-3',
      label: 'City',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'pincode',
      validateAs: 'number',
      cssClass: 'col-md-3',
      label: 'Pin Code',
      maxLength: 6,
      minLength: 6,
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
