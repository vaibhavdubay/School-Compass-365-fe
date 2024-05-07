import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { STORE_FEATURES } from '@sc-enums/store';
import { StoreModule } from '@ngrx/store';
import { AdminReducer } from './state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/effect';
import { AdminService } from './services/admin.service';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminMainComponent } from './admin.component';
import { SchoolProfileComponent } from './components/school-profile/school-profile.component';

// material
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  DragDropModule,
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AdminMainComponent,
    DashboardComponent,
    SchoolProfileComponent,
  ],
  imports: [
    ...material,
    CoreModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STORE_FEATURES.ADMIN, AdminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  providers: [AdminService],
})
export class AdminModule {}
