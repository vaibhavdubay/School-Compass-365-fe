import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canMatch: [authGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('@sc-modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('@sc-modules/students/students.module').then(
            (m) => m.StudentsModule,
          ),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('@sc-modules/teachers/teachers.module').then(
            (m) => m.TeachersModule,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
