import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { SomePage } from '../../pages/some/some'

import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // somePage: SomePage;
  gasData =20;
  lpgData = 20;
  smokeData = 20;
  humidityData =20;
  tempData =20;

  constructor(public fcm: FcmProvider, public toastCtrl: ToastController, public navCtrl:NavController) {

  }

  goAnOtherPage():void{
    this.navCtrl.setRoot(SomePage);
  }

  ionViewDidLoad(){
    this.fcm.getToken();
    this.fcm.listenToNotifications().pipe(
      tap(msg=>{
        // console.log("Title : "+msg.title+" Body :"+msg.body+" Data :"+JSON.stringify(msg));
        // JSON.stringify(msg)
        alert(msg.title+" "+msg.body );

        this.gasData=msg.gas;
        this.lpgData=msg.lpg;
        this.smokeData=msg.smoke;
        this.humidityData=msg.humidity;
        this.tempData=msg.temp;

        const toast = this.toastCtrl.create({
          message:msg.body,
          duration:3000
        });
        toast.present();
      })
    ).subscribe();
  }

  callBtnAction(){
    alert("Making a Call to Fire Department!");
    let clickEvent = "call";
    this.fcm.storeDataInFirebase(this.gasData,this.lpgData,this.smokeData,this.humidityData,this.tempData, clickEvent);
  }

  stopAlarmAction(){
    alert("You stopped the alarm!");
    let clickEvent = "Alarm";
    this.fcm.storeDataInFirebase(this.gasData,this.lpgData,this.smokeData,this.humidityData,this.tempData, clickEvent);
  }

  goToOverview(){
    
  }



}
