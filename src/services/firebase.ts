import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBKgzEJ0qkT5NqaxKhQneKbLqlkjiyc4uc",
  authDomain: "chat-app-7919e.firebaseapp.com",
  databaseURL: "https://chat-app-7919e.firebaseio.com",
  projectId: "chat-app-7919e",
  storageBucket: "chat-app-7919e.appspot.com",
  messagingSenderId: "764818837017",
  appId: "1:764818837017:web:7a43ae2eac2361e174e488",
  measurementId: "G-7HG61450R9"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();
