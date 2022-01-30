import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsAddComponent } from './components/students-add/students-add.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HogwartsComponent } from './hogwarts.component';

const routes: Routes = [
  {
    path: '',
    component: HogwartsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'characters', component: CharactersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'students/add', component: StudentsAddComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: '', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HogwartsRoutingModule {}
