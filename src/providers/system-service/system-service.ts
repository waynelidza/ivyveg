import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
/*
  Generated class for the SystemServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SystemServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SystemServiceProvider Provider');
  }

  register(cellphonenumber: string, password: string,name:string,surname:string,address:string,accountStatus:string,gcm:string) {
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/register', { cellphonenumber: cellphonenumber, password: password ,name:name,surname:surname,address:address,accountStatus:accountStatus,GCMID:gcm})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });
  }  login(cellphonenumber: string, password: string) {
    console.log("api");
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/login', { cellphonenumber: cellphonenumber, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }


  Findme(cellphonenumber: string) {
    console.log("api");
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/findme', { cellphonenumber: cellphonenumber})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }
  FindComments(Sender: string) {
    console.log("api");
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/cps', { Sender: Sender})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }
  Comment(Message: string,DatetimeSent:string,Sender:string,Status:string) {
    console.log("api");
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/cp', { Message: Message,DatetimeSent:DatetimeSent,Sender:Sender,Status:Status})
      .map(user => {

        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }

  getmyProducts(cellphonenumber: string) {
    console.log("api");
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/myproducts', { cellphonenumber: cellphonenumber})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }
  sendmessagetoAdmin() {
    return this.http.get<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/ivy/gcm')
      .map(user => {
        // login successful if there's a jwt token in the response

        if(user.status===401){

        }

        return user;
      });
  }
  getNews() {
    return this.http.get<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/adminNews')
      .map(user => {
        // login successful if there's a jwt token in the response

        if(user.status===401){

        }

        return user;
      });
  }

  shopNow(Totalprice: number, CustomerName: string,cellphonenumbers:string,details:string,status:string,DatetimeOrder:string) {
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/sell', { Totalprice: Totalprice, CustomerName: CustomerName ,callphonenumbers:cellphonenumbers,details:details,status:status,DatetimeOrder:DatetimeOrder })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }

  Report(name:string) {
    return this.http.post<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/report', { name: name})
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===401){

        }

        return user;
      });
  }




  sendmessageforDevilery() {
    console.log('here')
    return this.http.get<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/order/gcm',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }
  getProducts() {
    return this.http.get<any>('http://ec2-34-240-133-21.eu-west-1.compute.amazonaws.com:3000/products',)
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user.status);
        if(user.status===201){
          // this.showAlert();
        }

        return user;
      });


  }
}
