import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  public searchTerm = "";
  galleryID: any;
  loadedGallery: any;

  constructor(private activatedRoute: ActivatedRoute, private galleryService: GalleryService, private alertController: AlertController) { 
  }


  async addPhotoPrompt(galleryID) {
    console.log(galleryID)
    const alert = await this.alertController.create({
      header: 'Add Photo',
      inputs:[{
          name: 'imgName',
          type: 'text',
          placeholder: 'Image Name'
        }, 
        {
          name: 'imgDescription',
          type: 'text',
          placeholder: 'Description'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Add Photo',
          handler: (photoInfo) => {
            this.galleryService.addPhoto(galleryID, photoInfo['imgName'], photoInfo['imgDescription']);
          }
        }
      ]
    });

    await alert.present();
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      this.galleryID = paramMap.get('galleryID');
      this.loadedGallery = this.galleryService.getGallery(this.galleryID);
    })

    this.setSearchedPhotos(this.searchTerm)
  }

  setSearchedPhotos(searchTerm) {
    this.loadedGallery = this.galleryService.searchGallery(searchTerm, this.galleryID);
  }

}