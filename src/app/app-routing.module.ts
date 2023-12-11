import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileTemplateComponent } from './user-profile-template/user-profile-template.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"profile",component:UserProfileTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
