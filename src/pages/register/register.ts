import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(private fire : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register(){

  	this.fire.auth.createUserWithEmailAndPassword(this.uname.value,this.password.value)
    .then((data)=>{

    	console.log(data);

    	let alert = this.alertCtrl.create({
          title: 'User registered',
          subTitle: 'Please log In now',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(LoginPage);
    }).catch(error =>{
    	console.log(error);
    	 let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();  
    })
  	console.log(this.uname.value, this.password.value)

  }

  signIn(){
  	this.navCtrl.push(LoginPage);
  }

}