const firebaseConfig = {
    apiKey: "AIzaSyDct6Llp5nINGWnp6t-NBsxWin1riyccig",
    authDomain: "aglsistem-71590.firebaseapp.com",
    databaseURL: "https://aglsistem-71590-default-rtdb.firebaseio.com",
    projectId: "aglsistem-71590",
    storageBucket: "aglsistem-71590.appspot.com",
    messagingSenderId: "510994901595",
    appId: "1:510994901595:web:c12a5b74517b3a2c4ced7e",
    measurementId: "G-MFWNV461CE"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots:true});


var dat =[];
db.collection('Bursa_Prop').where('gelenzaman','>','2023-02-13-12-41-11').where('gelenzaman', '<','2023-02-13-13-11-11').get().then((snapshot) => {
  
    snapshot.docs.forEach((snapp)=>{
   
    dat.push(snapp.data());
   
    
    
    });
   
    });
    console.log(dat)
