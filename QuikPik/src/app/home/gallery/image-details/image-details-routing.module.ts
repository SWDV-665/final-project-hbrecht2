import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageDetailsPage } from './image-details.page';

const routes: Routes = [
  {
    path: '',
    component: ImageDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageDetailsPageRoutingModule {}
