// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSVNMkS7fEOZ5CKkErtT31DayADygSqb0",
  authDomain: "swim-me.firebaseapp.com",
  projectId: "swim-me",
  storageBucket: "swim-me.appspot.com",
  messagingSenderId: "93610893471",
  appId: "1:93610893471:web:50824e38e5edfb9f32c2aa",
  measurementId: "G-ETKESW6WNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: 'BFcUEJHs1k9Npd-GJH7gnFou7buOBPltcb6_6EBXnhQFlfv9XxjtJVieMQyJN3tGaTOYvkY86ONprFVpE7QQn3U' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
console.log("hey");
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.

// const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("hoopla");
  console.log('Message received. ', payload);
  // ...
});
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };
//
//   window.self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
