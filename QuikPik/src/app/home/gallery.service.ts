import { Injectable } from '@angular/core';
import { PhotoService } from './photo.service';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  id = 2;
  imgID = 10;

  galleries=[{
    id: 1,
    name: "Sunflower Field - Summer 2020", 
    src: "https://parkseed.com/images/xxl/52081-pk-p1.jpg",
    contents: [{
      imgID: 1,
      imgName: 'Sunflower 1',
      imgDate: 'July 29, 2020', 
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU'
    },
    {
      imgID: 2,
      imgName: 'Sunflower 2',
      imgDate: 'July 29, 2020', 
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU'
    },
    {
      imgID: 3,
      imgName: 'Sunflower 3',
      imgDate: 'July 29, 2020', 
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjgiaMX8VUHR1J58eHJhD41sn4fETYnJogDQ&usqp=CAU'
    },
    ]
  }];

  constructor(public photoService: PhotoService) { }

  getAllGalleries(){
    return [...this.galleries];
  }

  getGallery(galleryID: string | number){
    return {
      ...this.galleries.find(gallery=>{
        return gallery.id == galleryID;
      })
    }
  }

  deleteGallery(index){
    this.galleries.splice(index, 1)
  }

  addGallery(galleryName){
    this.id += 1;
    let src="https://www.jing.fm/clipimg/detail/32-326482_albums-clip-art-panda-free-images-albumclipart-.png"

    let newGallery = {
      id: this.id,
      name: galleryName,
      src: src,
      contents: []
    }
    this.galleries.push(newGallery);
  }

  addPhoto(galleryID, name, description){
    this.imgID += 1;
    let imgSrc="https://www.jing.fm/clipimg/detail/32-326482_albums-clip-art-panda-free-images-albumclipart-.png";
    
    let newPhoto = {
      imgID: this.imgID,
      imgName: name, 
      imgDate: description, 
      imgSrc: imgSrc
    }
    this.galleries.find(x => x.id == galleryID).contents.push(newPhoto);
  }

}
