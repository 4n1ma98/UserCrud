import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincComponent } from './Components/loginc/loginc.component';
import { ContainercComponent } from './Components/containerc/containerc.component';
import { authGuard, authGuard2 } from './Guards/auth.guard';
import { ErrorcComponent } from './Components/errorc/errorc.component';

const routes: Routes = [
  {
    path: '',
    component: ContainercComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LogincComponent, canActivate: [authGuard2] },
  { path: '**', component: ErrorcComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
