import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';
import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { Role } from '@sc-enums/role';

export interface AdminUser {
  _id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: ProfileImage;

  password: string;
  role: Role;
  userName: string;
  phoneNumber: string;
  createdAt: Date;
  updateAt: Date;
}

export interface SchoolProfile {
  _id: string;
  name: string;
  establishedYear: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  schoolDISECode: string;
  schoolCode: string;
  classes: Class[];
}

export interface TeacherProfile {
  _id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  profileImage: ProfileImage;
  email: string;
  password: string;
  role: Role;
  userName: string;
  phoneNumber: string;
  createdAt: Date;
  updateAt: Date;
  subjects: string[];
  years_of_experience: number;
}

export interface ProfileImage {
  _id: string;
  url: string;
}

export interface StudentProfile {
  _id: string;
  schoolId: string;
  class: string;
  classSection: string;
  firstName: string;
  lastName: string;
  profileImage: ProfileImage;
  email: string;
  password: string;
  role: Role;
  userName: string;
  createdAt: Date;
  phoneNumber: string;
  updateAt: Date;
  pen: string;
  academicStatus: ACADEMIC_STATUS;
  dateOfBirth: Date;
  gender: GENDER;
  bloodGroup: BLOOD_GROUP;
  parents_guardians: Parents_Guardians[];
}

export interface Parents_Guardians {
  name: string;
  relationship: string;
  contact_info: {
    email: string;
    phone: string;
  };
}

export interface Class {
  _id: string;
  className: string;
  nextClass: string;
  order: number;
  streamsRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface NavItem {
  icon?: string;
  label: string;
  privileges?: Role[];
  routerLink: string[];
  children?: NavItem[];
}

export type LoggedInUser = (AdminUser | StudentProfile | TeacherProfile) & {
  user: User;
  school: SchoolProfile;
};

export interface User {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
  role: Role;
  profileImage?: ProfileImage;
  changePassword: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  userProfile: LoggedInUser;
}

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface HttpErrorObject {
  statusCode: number;
  message: string;
}
