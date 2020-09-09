import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'reactive', pathMatch: 'full' },
  {
    path: 'reactive',
    component: ReactiveFormComponent,
    children: [
      {
        path: 'dynamic',
        component: DynamicFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
