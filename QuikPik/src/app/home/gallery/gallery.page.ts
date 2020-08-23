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
  contents: [];
  loadedGallery: any;
  searchedGallery: any;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private galleryService: GalleryService, private alertController: AlertController) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      this.galleryID = paramMap.get('galleryID');
      this.loadedGallery = this.galleryService.getGallery(this.galleryID);
    })
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

  searchGallery(searchTerm, loadedGallery){
    return loadedGallery.contents.filter(photo => {
      return photo.imgName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    })
  }

  setSearchedPhotos(searchTerm) {
    this.searchedGallery = this.searchGallery(searchTerm, this.loadedGallery);
    alert(this.searchedGallery);
  }

}