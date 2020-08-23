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
  galleries: any  = []; 
  errorMessage: string;

  constructor(public alertController: AlertController, private galleryService: GalleryService) {
    galleryService.dataChanged$.subscribe((dataChanged: boolean)=>{
      this.loadGalleries();
    });
  }

  ionViewDidLoad(){
    this.loadGalleries();
  }

  loadGalleries(){
    this.galleryService.getAllGalleries()
    .subscribe(
      galleries => this.galleries = galleries,
      error => this.errorMessage = <any>error);
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
          text: 'Add Gallery',
          handler: (gallery) => {
            this.galleryService.addGallery(gallery['name']);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteGallery(id){
    this.galleryService.deleteGallery(id);
  }

  ngOnInit() {
    this.loadGalleries();
  }
}
