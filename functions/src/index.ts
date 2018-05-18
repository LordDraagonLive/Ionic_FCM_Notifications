import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import { ClientResponse } from 'http';
import { ADDRGETNETWORKPARAMS } from 'dns';
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
    .onCreate(async event=>{
        console.log('Triggered');
        const gasData:string = ""+event.val().gas;
        const lpgData:string = ""+event.val().lpg;
        const smokeData:string = ""+event.val().smoke;
        const humidityData:string = ""+event.val().humidity;
        const tempData:string = ""+event.val().temp;
        
        
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
            notification:{
                title:'Alarm Rang!',
                body: gasData+'ppm of gas detected!',
                icon:'https://goo.gl/images/QBYFKs',
                sound:'default',
                
            },
            data:{
                title:'Alarm Rang!',
                body: gasData+'ppm of gas detected!',
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
        const token="d4CnPBKzxKI:APA91bEhrgYcJBlM2RYXsvjbaDfF4sHjBApGNSC8AczH2aE80qIbsJtQiCmFR_8Yh57yTYP3ZcvV3pzm847Yz7WioEhOz-QPNB0s9MBkxsCvWaCEsSVb1juR3CsPKePgFSq1qshcpxF_";

        // await deviceRef.once('value').then(snapshot =>{
        //   if(snapshot.exists()){
        //     tokens.push(snapshot.data().token);
        //   } else{
        //     //   return Promise;
        //     // console.log('Coudn\'t find the data in firebase');
        //     // return;
        //   }
        // });
        if(Number(gasData)<60){
            console.log('Alert not triggered!')
            return null;
        }else{
            console.log('Alert sent to user!')
            return admin.messaging().sendToDevice(token,payload)
        }
    });


