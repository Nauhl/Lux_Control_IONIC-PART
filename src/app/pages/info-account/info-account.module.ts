import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAccountPageRoutingModule } from './info-account-routing.module';

import { InfoAccountPage } from './info-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAccountPageRoutingModule
  ],
  declarations: [InfoAccountPage]
})
export class InfoAccountPageModule {}
