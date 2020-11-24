import { rosapi } from "ros-sdk-js"

export const api = new rosapi("https://api.ros-cloud.at", {
    apiKey: "AIzaSyBTEaBrtxi329vwEvYUlAl4pKEk9XJ9PjY",
    authDomain: "ros-cloud-cc711.firebaseapp.com",
    databaseURL: "https://ros-cloud-cc711.firebaseio.com",
    projectId: "ros-cloud-cc711",
    storageBucket: "ros-cloud-cc711.appspot.com",
    messagingSenderId: "175713596436",
    appId: "1:175713596436:web:72844d2b29a01ebaa76301",
    measurementId: "G-ZZXD7PLMCP",
    authPersistance: "LOCAL" //Dieser Wert kann LOCAL, SESSION oder NONE entsprechen
})

export default api
