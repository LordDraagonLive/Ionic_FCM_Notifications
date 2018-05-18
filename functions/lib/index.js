"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// import firebase from 'firebase';
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.gasAlarmNotification = functions.database
    .ref('/DataLeaks/Device01/{results}')
    .onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    console.log('Triggered');
    const gasData = "" + event.val().gas;
    const lpgData = "" + event.val().lpg;
    const smokeData = "" + event.val().smoke;
    const humidityData = "" + event.val().humidity;
    const tempData = "" + event.val().temp;
    //obj to be sent through notification
    // const jsonObj = {
    //     gas: gasData,
    //     lpg:lpgData,
    //     smoke:smokeData,
    //     humidity:humidityData,
    //     temp:tempData
    // }
    // console.log('The gas value : '+jsonObj.gas);
    //send Notification
    const payload = {
        notification: {
            title: 'Alarm Rang!',
            body: gasData + 'ppm of gas detected!',
            icon: 'https://goo.gl/images/QBYFKs',
            sound: 'default',
        },
        data: {
            title: 'Alarm Rang!',
            body: gasData + 'ppm of gas detected!',
            gas: gasData,
            lpg: lpgData,
            smoke: smokeData,
            humidity: humidityData,
            temp: tempData
        }
    };
    //ref to MobileDevices
    // const db = admin.database();
    // const deviceRef = await admin.database().ref('MobileDevices');
    //get user's token and send notification
    const token = "d4CnPBKzxKI:APA91bEhrgYcJBlM2RYXsvjbaDfF4sHjBApGNSC8AczH2aE80qIbsJtQiCmFR_8Yh57yTYP3ZcvV3pzm847Yz7WioEhOz-QPNB0s9MBkxsCvWaCEsSVb1juR3CsPKePgFSq1qshcpxF_";
    // await deviceRef.once('value').then(snapshot =>{
    //   if(snapshot.exists()){
    //     tokens.push(snapshot.data().token);
    //   } else{
    //     //   return Promise;
    //     // console.log('Coudn\'t find the data in firebase');
    //     // return;
    //   }
    // });
    if (Number(gasData) < 60) {
        console.log('Alert not triggered!');
        return null;
    }
    else {
        console.log('Alert sent to user!');
        return admin.messaging().sendToDevice(token, payload);
    }
}));
//# sourceMappingURL=index.js.map