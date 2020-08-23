import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDetailsPageRoutingModule } from './image-details-routing.module';

import { ImageDetailsPage } from './image-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDetailsPageRoutingModule
  ],
  declarations: [ImageDetailsPage]
})
export class ImageDetailsPageModule {}
