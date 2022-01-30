import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'hogwarts',
    loadChildren: () =>
      import('./hogwarts/hogwarts.module').then((m) => m.HogwartsModule),
  },
  { path: '', redirectTo: 'hogwarts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
