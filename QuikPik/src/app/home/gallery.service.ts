import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  id = 2;
  imgID = 10;

  galleries = [
    {
      id: 1,
      name: "Sunflower Field - Summer 2020",
      src: "https://parkseed.com/images/xxl/52081-pk-p1.jpg",
      contents: [
        {
          imgID: 1,
          imgName: "Sunflower 1",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 2",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 3",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 4",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 5",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 6",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 7",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 8",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 9",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        },
        {
          imgID: 2,
          imgName: "Sunflower 10",
          imgDate: "July 29, 2020",
          imgDescription: "Trip to sunflower field in July of 2020",
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU",
        }
      ],
    },
  ];

  constructor(private camera: Camera, private file: File, private webview: WebView) {}

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
  };

  async captureImage(name) {
    const tempImage = await this.camera.getPicture(this.options);

    // Get file name of temp image 
    const tempFilename = tempImage.substr(tempImage.lastIndexOf("/") + 1);
    //Get file extension 
    const fileExt = tempImage.substr(tempImage.lastIndexOf("."))
    //Get full path minus file name of temp image
    const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf("/") + 1);
    // Get the Data directory on the device
    const newBaseFilesystemPath = this.file.dataDirectory;

    var dateTime = new Date;
    var dateString = dateTime.toString().replace(/\s/g, '');

    name = name.replace(/\s/g, '')
    const newFileName = name + dateString + fileExt;

    await this.file.copyFile(tempBaseFilesystemPath, tempFilename, 
      newBaseFilesystemPath, newFileName);

    const storedPhotoPath = newBaseFilesystemPath + newFileName;
    return this.webview.convertFileSrc(storedPhotoPath);
  } 

  getAllGalleries() {
    return [...this.galleries];
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

  deleteGallery(index) {
    this.galleries.splice(index, 1);
  }

  addGallery(galleryName) {
    this.id += 1;

    let src =
      "https://www.jing.fm/clipimg/detail/32-326482_albums-clip-art-panda-free-images-albumclipart-.png";

    let newGallery = {
      id: this.id,
      name: galleryName,
      src: src,
      contents: [],
    };
    this.galleries.push(newGallery);
  }

  async addPhoto(galleryID, name, description) {
    this.imgID += 1;

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
    const newFileName = name + this.imgID + fileExt;

    await this.file.copyFile(tempBaseFilesystemPath, tempFilename, 
      newBaseFilesystemPath, newFileName);

    const storedPhotoPath = newBaseFilesystemPath + newFileName;
    let imgSrc = this.webview.convertFileSrc(storedPhotoPath);
    

    let newPhoto = {
      imgID: this.imgID,
      imgName: name,
      imgDate: "August 22, 2019",
      imgDescription: description,
      imgSrc: imgSrc,
    };
    this.galleries.find((x) => x.id == galleryID).contents.push(newPhoto);
  }
}
