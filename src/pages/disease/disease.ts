
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Http, RequestOptions,Response, Headers } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
// import {Http} from '@angular/http';
/**
 * Generated class for the DiseasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-disease',
  templateUrl: 'disease.html',
})
export class DiseasePage {
   constructor(public navCtrl: NavController,private camera: Camera,private http:Http, private alertCtrl: AlertController) {}
  name;
  special64;
  err;
  submit = false;
  
  // 922428CF
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiseasePage');
  }
  public base64Image: string;
 sourceSelection;
 result:any;
//   //This module will basically check for uploaded inputs 
//   // inputs will be (Fruits) and (currentImage), (compareFruitImage)
//  // 
//    //first thing would be crop selection
//    crops = this.http.get('/api/crop').subscribe(res=>{
//      console.log(res);
//      return res;
//    })
   takePicture(source){
   if(source=="camera"){
      this.sourceSelection = this.camera.PictureSourceType.CAMERA
}else if(source=="gallery"){
      this.sourceSelection = this.camera.PictureSourceType.PHOTOLIBRARY
}
    this.camera.getPicture({
      sourceType:this.sourceSelection,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
  //      targetWidth: 1000,
  //      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
     
    }, (err) => {
        console.log(err);
    });
}
//evil Plan
    specialPicture(source){
   if(source=="camera"){
      this.sourceSelection = this.camera.PictureSourceType.CAMERA
}else if(source=="gallery"){
      this.sourceSelection = this.camera.PictureSourceType.PHOTOLIBRARY
}
    this.camera.getPicture({
      sourceType:this.sourceSelection,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
  //      targetWidth: 1000,
  //      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.special64 = "data:image/jpeg;base64," + imageData;
     
    }, (err) => {
        console.log(err);
    });
}
//this will update the firebase photo
setSpecial(){
  let data ={
    special64:this.special64,
    name:this.name
  } 
  let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
  this.http.post('atrixdigital1.fwd.wf/disease/special',data,options);
}
onSubmit(){
  let data = {
    name: this.name, 
    currentImg: this.base64Image
  }
  console.log(data);
   let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
  this.http.post('https://atrixdigital1.fwd.wf/disease/',data,options)
  .map(res=>{
    let body = res.json();
    return body;
  })
  .subscribe(res=>{
    this.submit = true;
    this.result = res;
  })
}
test(){
  let data = {
    name: this.name, 
    currentImg: this.base64Image
  }
  console.log(data);
   let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
  this.http.post('https://atrixdigital1.fwd.wf/disease/special',data,options)
  .subscribe(res=>{
    this.submit = true;
    this.result = res;
    setTimeout(()=>{
        let alert = this.alertCtrl.create({
          title: 'Result :'+this.result.dissimilarity,
          subTitle: this.result.message,
          buttons: ['OK']
        });
        alert.present();
    },2200)
  })
} 
  //now submitting an http Post request for results 
  // this.http.post('/diseases/crop', data)
  // .subscribe(res=>{
  //    //getting res 
  //    this.result = res;
  // })
}