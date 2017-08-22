
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Http, RequestOptions,Response, Headers } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs'
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
  
  @ViewChild('name') name;
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

 refrestValues(){
      this.base64Image= "";
      this.name.value = "";
    }
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

   console.log("clsjchbsdjcbdjscb")
  let data ={
    currentImg:this.base64Image,
    name:this.name.value
  } 
  let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
  this.http.post('https://atrixdigital1.fwd.wf/disease/special',data,options)
  .map(res=>res.json()).subscribe((data)=>{
    console.log(data.message);
  },(err)=>{
    console.log(err);
  });
}
onSubmit(){
  let data = {
    name: this.name.value, 
    currentImg: this.base64Image
  }

  if(!data.currentImg){
      let ImgAlert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please upload an Image',
          buttons: ['OK']
        });
        ImgAlert.present();
  }else if(!data.name){
     let CropAlert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please select a crop',
          buttons: ['OK']
        });
        CropAlert.present();

  }
  console.log(data);
   let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
       let options = new RequestOptions({ headers: myHeaders });
  this.http.post('https://atrixdigital1.fwd.wf/disease/',data,options)
  .map(res=> res.json())
  .catch((error: Response | any)=>{
    console.log(error.message || error);
    setTimeout(()=>{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.message  || error,
          buttons: ['OK']
        });
        alert.present();
    },10)
    return Observable.throw(error.message || error);
  })
  .subscribe(res=>{
    this.submit = true;
    this.result = res;
     setTimeout(()=>{
        let alert = this.alertCtrl.create({
          title: '<img src="'+this.base64Image+'"/>',
          subTitle: '<p>'+ this.result.message+'<br> <b>Solution :</b>'+ this.result.solution ,
          buttons: ['OK']
        });
        alert.present();
        this.refrestValues();
    },1200)
  }, err=>{
    setTimeout(()=>{
        let alert = this.alertCtrl.create({
          title: 'Result :',
          subTitle: 'Server Error'+this.result.message ,
          buttons: ['OK']
        });
        alert.present();
        this.refrestValues()
    },2200)

  })
}


// test(){
//   let data = {
//     name: this.name, 
//     currentImg: this.base64Image
//   }
//   console.log(data);
//    let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');    
//        let options = new RequestOptions({ headers: myHeaders });
//   this.http.post('https://atrixdigital1.fwd.wf/disease/special',data,options)
//   .map(res=> res.json())
//   .catch((error: Response | any)=>{
//     console.log(error.message || error);
//     setTimeout(()=>{
//         let alert = this.alertCtrl.create({
//           title: 'Error',
//           subTitle: error.message  || error,
//           buttons: ['OK']
//         });
//         alert.present();
//     },300)
//     return Observable.throw(error.message || error);
//   })
//   .subscribe(res=>{
//     this.submit = true;
//     this.result = res;
//     setTimeout(()=>{
//         let alert = this.alertCtrl.create({
//           title: 'Result :'+this.result.dissimilarity,
//           subTitle: this.result.message,
//           buttons: ['OK']
//         });
//         alert.present();
//     },2200)
//   }, err=>{
//     setTimeout(()=>{
//         let alert = this.alertCtrl.create({
//           title: 'Result :',
//           subTitle: 'Error',
//           buttons: ['OK']
//         });
//         alert.present();
//     },2200)

//   })
// } 
  //now submitting an http Post request for results 
  // this.http.post('/diseases/crop', data)
  // .subscribe(res=>{
  //    //getting res 
  //    this.result = res;
  // })
}