import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('temp') temperature;
 @ViewChild('ph') ph;
 @ViewChild('sunlight') sunlight;
 @ViewChild('moisture') moisture;


  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }


  submit(){
  	
     if(this.temperature.value > 0 && this.temperature.value < 55 && this.ph.value > 0  && this.ph.value < 14  )
     {
        console.log(this.temperature.value);
         console.log(this.ph.value);
        console.log(this.sunlight.value);
        console.log(this.moisture.value);
     }else{


          let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Invalid values',
          buttons: ['OK']
        });
        alert.present();
          
        this.temperature.value = "";
        this.ph.value = "";
        this.sunlight.value = "";
        this.moisture.value = "";  


     }

   
  }



}
