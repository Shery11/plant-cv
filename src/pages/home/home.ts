import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { ValuesProvider } from '../../providers/values/values';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('temp') temperature;
 @ViewChild('ph') ph;
 @ViewChild('sunlight') sunlight;
 @ViewChild('moisture') moisture;


  constructor(public navCtrl: NavController, private alertCtrl: AlertController,public value : ValuesProvider) {

  }


  refrestValues(){
      this.temperature.value = "";
      this.ph.value = "";
      this.sunlight.value = "";
      this.moisture.value = "";  
  }


  submit(){
  	
     if(this.temperature.value > 0 && this.temperature.value < 55 && this.ph.value > 0  && this.ph.value < 14  )
     {
        // console.log(this.temperature.value);
        //  console.log(this.ph.value);
        // console.log(this.sunlight.value);
        // console.log(this.moisture.value);
         
         var data = this.temperature.value+ " " + this.ph.value + " " + this.sunlight.value +" " + this.moisture.value;
         // console.log(data);

         this.value.getvalues(data).map(res => res.json())
        .subscribe(
          data =>{ 
            console.log(data.minMatch[0].label);

             let alert = this.alertCtrl.create({
              title: "<h1>Result </h1>",
              subTitle: data.bestMatch.toUpperCase()  + " is best for this soil<hr>" ,
              message : "Soil is also suitable for <br>"+ data.minMatch[0].label.toUpperCase()+"<br>"+data.minMatch[1].label.toUpperCase()+"<br>"+data.minMatch[2].label.toUpperCase()+"<br>"+data.minMatch[3].label.toUpperCase()+".",
              buttons: ['OK']
            });
            alert.present();

          },  
          err => console.log(err),
          () => {
             this.refrestValues();
          }
        );

     }else{


          let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Invalid values',
          buttons: ['OK']
        });
        alert.present();
          
       this.refrestValues();


     }

   
  }



}
