import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompleteComponent } from './components/complete/complete.component';

const routes: Routes = [
  {
    path: '', component: CompleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteRoutingModule { }
