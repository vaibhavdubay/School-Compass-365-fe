import { NavItem } from '@sc-models/core';
import { FormConfig } from '@sc-models/form';

export const sideNavConfig: NavItem[] = [
  {
    icon: 'analytics',
    label: 'Dashboard',
    routerLink: ['./dashboard'],
  },
  {
    icon: 'co_present',
    label: 'Teachers',
    routerLink: ['./teachers'],
  },
  {
    icon: 'local_library',
    label: 'Students',
    routerLink: ['./students'],
  },
  {
    icon: 'class',
    label: 'Classes',
    routerLink: ['./classes'],
  },
  {
    icon: 'assignment',
    label: 'Examinations',
    routerLink: ['./examinations'],
  },
  {
    icon: 'event',
    label: 'Events',
    routerLink: ['./events'],
  },
  {
    icon: 'list',
    label: 'Leaves',
    routerLink: ['./leaves'],
  },
  {
    icon: 'move_down',
    label: 'Transferred',
    routerLink: ['./transferred'],
  },
];

export const schoolFormConfig: FormConfig = [
  {
    elementType: 'text',
    element: {
      key: 'phoneNumber',
      validateAs: 'number',
      required: true,
      label: 'Phone',
      cssClass: 'col-md-4',
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
    elementType: 'text',
    element: {
      key: 'address1',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Address 1',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'address2',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Address 2',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'town',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Town',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'city',
      options: [],
      cssClass: 'col-md-4',
      label: 'City',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'state',
      options: [],
      cssClass: 'col-md-4',
      label: 'State / Province',
    },
  },
  {
    elementType: 'text',
    element: {
      key: 'pincode',
      validateAs: 'text',
      cssClass: 'col-md-4',
      label: 'Zip / Postal Code',
    },
  },
  {
    elementType: 'select',
    element: {
      key: 'state',
      options: [],
      cssClass: 'col-md-4',
      label: 'Country / Region',
    },
  },
  //   {
  //     elementType: 'date',
  //     element: {
  //       key: 'date',
  //       label: 'Date',
  //     },
  //   },
  //   {
  //     elementType: 'button-group',
  //     element: {
  //       key: 'submit',
  //       cssClass: 'col-md-12 text-center justify-content-end d-flex py-4',
  //       buttons: [
  //         {
  //           elementType: 'button',
  //           element: {
  //             key: 'cancel',
  //             type: 'button',
  //             cssClass: 'col',
  //             theme: 'raised',
  //             color: 'basic',
  //             label: 'Cancel',
  //           },
  //         },
  //         {
  //           elementType: 'button',
  //           element: {
  //             key: 'continue',
  //             theme: 'raised',
  //             cssClass: 'col',
  //             type: 'reset',
  //             color: 'warn',
  //             label: 'Continue',
  //           },
  //         },
  //       ],
  //       label: 'Submit',
  //     },
  //   },
];
