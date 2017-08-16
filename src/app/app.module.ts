import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ValuesProvider } from '../providers/values/values';


const firebaseAuth = {
   apiKey: "AIzaSyA1xI8zkTTyQVsGQ8tPMY4dsvVd6sSoCqs",
   authDomain: "jobsfiverr-4acf1.firebaseapp.com",
   databaseURL: "https://jobsfiverr-4acf1.firebaseio.com",
   projectId: "jobsfiverr-4acf1",
   storageBucket: "jobsfiverr-4acf1.appspot.com",
   messagingSenderId: "80394490012"
  }


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ValuesProvider
  ]
})
export class AppModule {}
