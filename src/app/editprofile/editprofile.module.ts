import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './editprofile-routing.module';
import { EditProfilePage } from './editprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,        // ← para [(ngModel)]
    IonicModule,        // ← para <ion-*>
    EditProfilePageRoutingModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
