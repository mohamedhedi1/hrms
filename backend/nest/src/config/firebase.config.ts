import { initializeApp } from 'firebase/app';
const firebaseConfig = {
        apiKey: "AIzaSyB0VMUlBYwQ4HOxPh314qLGTYD9tdMxhOE",
        authDomain: "piweb-9bc3d.firebaseapp.com",
        projectId: "piweb-9bc3d",
        storageBucket: "piweb-9bc3d.appspot.com",
        messagingSenderId: "32295597155",
        appId: "1:32295597155:web:f869a611da10032c83f456"
      };

      
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
