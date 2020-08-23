import { Component, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../gallery.service';
import { IonSlides } from '@ionic/angular';
import { GalleryPage } from '../gallery.page';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.page.html',
  styleUrls: ['./image-details.page.scss'],
})
export class ImageDetailsPage {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  loadedGallery: any;

  constructor(private activatedRoute: ActivatedRoute, private galleryService: GalleryService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      const galleryID = paramMap.get('galleryID');
      const imageID = paramMap.get('imageID');
      this.loadedGallery = this.galleryService.getGallery(galleryID);
      console.log(this.loadedGallery)
    })
  }

}