import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';
import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { Role } from '@sc-enums/role';

export interface AcademicYear {
  id: string;
  academicYear: string;
  current: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchoolProfile {
  id: string;
  name: string;
  establishedYear: number;
  address1: string;
  address2: string;
  academicYears: AcademicYear[];
  logoUrl: string;
  currentAcademicYear: AcademicYear;
  city: string;
  town: string;
  state: string;
  pincode: number;
  schoolDISECode: string;
  schoolCode: string;
  classes: Class[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherProfile {
  id: string;
  gender: GENDER;
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  academicYears: AcademicYear[];
  profileImageUrl: string;
  subjects: string[];
  years_of_experience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  schoolId: string;
  class: Class;
  classSection: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pen: string;
  academicStatus: ACADEMIC_STATUS;
  dateOfBirth: Date;
  gender: GENDER;
  bloodGroup: BLOOD_GROUP;
  profileImageUrl: string;
  academicYears: AcademicYear[];
  parentsGuardians: ParentOrGuardian[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ParentOrGuardian {
  id: string;
  name: string;
  gender: GENDER;
  relations: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: string;
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

export type LoggedInUser = UserProfile & {
  user: User;
  school: SchoolProfile;
};

export type UserProfile = AdminUser & StudentProfile & TeacherProfile;

export interface User {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
  role: Role;
  profileImageUrl: string;
  changePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
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
