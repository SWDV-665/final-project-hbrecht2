import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  galleries: any = [];
  
  dataChanged$: Observable<boolean>;
  private dataChangedSubject: Subject<boolean>;

  baseURL = "https://photogalleryserver.herokuapp.com";

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
  };

  constructor(private camera: Camera, private file: File, private webview: WebView, private http: HttpClient) {
    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  getAllGalleries(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/galleries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return (body || {}) as object[];
    }
  
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getGallery(galleryID: string | number) {
    return {
      ...this.galleries.find((gallery) => {
        return gallery.id == galleryID;
      }),
    };
  }

  searchGallery(searchTerm, galleryID){
    const gallery = this.galleries.find(gallery => gallery.id == galleryID);

    return gallery.contents.filter(photo => {
      return photo.imgName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    })
  }

  deleteGallery(id) {
    this.http.delete(this.baseURL + '/api/galleries/' + id).subscribe(res => {
    this.galleries = res;
    this.dataChangedSubject.next(true);
  });
}

  addGallery(galleryName) {

    let src = "../assets/quikpiklogo.png";

    let newGallery = {
      name: galleryName,
      src: src,
      contents: [],
    };
    
    this.http.post(this.baseURL + '/api/galleries/', newGallery).subscribe(res => {
    this.galleries = res;
    this.dataChangedSubject.next(true);
  });
  }

  async addPhoto(galleryID, name, description) {
    const tempImage = await this.camera.getPicture(this.options);

    // Get file name of temp image 
    const tempFilename = tempImage.substr(tempImage.lastIndexOf("/") + 1);
    //Get file extension 
    const fileExt = tempImage.substr(tempImage.lastIndexOf("."))
    //Get full path minus file name of temp image
    const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf("/") + 1);
    // Get the Data directory on the device
    const newBaseFilesystemPath = this.file.dataDirectory;


    //Remove spaces from name to insert into filename 
    name = name.replace(/\s/g, '')
    let randInt = Math.floor(Math.random() * Math.floor(10000000))
    const newFileName = name + randInt + fileExt;

    await this.file.copyFile(tempBaseFilesystemPath, tempFilename, 
      newBaseFilesystemPath, newFileName);

    const storedPhotoPath = newBaseFilesystemPath + newFileName;
    let imgSrc = this.webview.convertFileSrc(storedPhotoPath);
    

    let newPhoto = {
      imgName: name,
      imgDate: "August 22, 2019",
      imgDescription: description,
      imgSrc: imgSrc,
    };
    this.galleries.find((x) => x.id == galleryID).contents.push(newPhoto);
  }
}
