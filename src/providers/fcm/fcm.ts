import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';


/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  fireDB= firebase.database().ref('/DataLeaks');

  constructor(
    public firebaseNative: Firebase,
    public angularFireDb: AngularFireDatabase,
    private platform:Platform) {}

  async getToken(){
    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
    }
    return this.saveTokenToFirebase(token)  
  }

  private saveTokenToFirebase(token) {
    if(!token) return;

    const deviceRef = this.angularFireDb.object('MobileDevices');

    const docData = {
      token,
      userId:'testUser',
    }
    return deviceRef.set(docData);
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

  storeDataInFirebase(gasData,lpgData,smokeData,humidityData,tempData, clickEvent){
      //Creating a new childnode under the user node in the firbase from the new user
      this.fireDB.child('/Device01/DeviceLeakHistory').set({
        click:clickEvent,
        body: gasData+'ppm of gas detected!',
        gas: gasData,
        lpg: lpgData,
        smoke: smokeData,
        humidity: humidityData,
        temp: tempData
      }).then(()=>{
        // resolve({sucess:true});
      }).catch((err)=>{
        // reject(err);
      })
  }



}
