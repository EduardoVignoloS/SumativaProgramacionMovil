import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilePage } from './editprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfilePageRoutingModule {}
