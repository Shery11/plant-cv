import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('temp') temperature;
 @ViewChild('ph') ph;
 @ViewChild('sunlight') sunlight;
 @ViewChild('moisture') moisture;


  constructor(public navCtrl: NavController) {

  }


  submit(){
  	console.log(this.temperature.value);
  	console.log(this.ph.value);
  	console.log(this.sunlight.value);
  	console.log(this.moisture.value);
  }



}
