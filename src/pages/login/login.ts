import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(private fireauth: AngularFireAuth ,public navCtrl: NavController,public alertCtrl: AlertController) {

  }

   
   signIn(){

     this.fireauth.auth.signInWithEmailAndPassword(this.uname.value, this.password.value).then((data)=>{
        console.log(data);
        let alert = this.alertCtrl.create({
          title: 'Logged In',
          subTitle: 'You are logged In',
          buttons: ['OK']
        });

        alert.present();
        this.navCtrl.push(HomePage);

     }).catch(error =>{
          console.log(error);
          let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();  

     })
   
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  register(){
  	this.navCtrl.push(RegisterPage);
  }

}