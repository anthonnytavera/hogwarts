import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HogwartsRoutingModule } from './hogwarts-routing.module';
import { CharactersComponent } from './components/characters/characters.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HogwartsComponent } from './hogwarts.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentsAddComponent } from './components/students-add/students-add.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    CharactersComponent,
    StudentsComponent,
    TeachersComponent,
    HogwartsComponent,
    StudentsAddComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HogwartsRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
})
export class HogwartsModule {}
