import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
}

const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG
}

export class PhotoService {
  public photos: Photo[] = [];

  constructor(private camera:Camera) {}


  
}
