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
  loadedGallery: any;

  constructor(private activatedRoute: ActivatedRoute, private galleryService: GalleryService, private alertController: AlertController) { }


  async addPhotoPrompt(galleryID) {
    console.log(galleryID)
    const alert = await this.alertController.create({
      header: 'Add Photo',
      inputs:[{
          name: 'imgName',
          type: 'text',
          placeholder: 'What should we title this photo?'
        }, 
        {
          name: 'imgDescription',
          type: 'text',
          placeholder: 'What was going on in this photo?'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Add Photo',
          handler: (photoInfo) => {
            this.galleryService.addPhoto(galleryID, photoInfo['name'], photoInfo['description']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      const galleryID = paramMap.get('galleryID');
      this.loadedGallery = this.galleryService.getGallery(galleryID);
    })
  }

}
