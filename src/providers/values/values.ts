import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ValuesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ValuesProvider {

  constructor(public http: Http) {
    console.log('Hello ValuesProvider Provider');
  }

 getvalues(data){

 	  console.log(data);
 	  var header = new Headers();
      header.append("Access-Control-Allow-Origin", "http://localhost:8100");
      
      return this.http.post("https://atrixdigital1.fwd.wf/sensor/data",{ name : data },{
      	headers: header	
      });
  }

}
