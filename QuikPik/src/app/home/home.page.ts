import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  Title = "QuikPik"
  LogoSrc = "../assets/quikpiklogo.png"
  galleries = []; 

  constructor(public alertController: AlertController, private galleryService: GalleryService) {}

  loadGalleries(){
    return this.galleryService.getAllGalleries();
  }

  openGallery(){
    console.log("gallery");
  }

  async addGalleryPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Gallery',
      inputs:[{
          name: 'name',
          type: 'text',
          placeholder: 'What should we call this gallery?'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Add Item',
          handler: (gallery) => {
            this.galleryService.addGallery(gallery['name']);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteGallery(index){
    this.galleryService.deleteGallery(index);
  }

  ngOnInit() {
  }
}
