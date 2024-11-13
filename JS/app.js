const firebaseConfig = {
    apiKey: "AIzaSyCDYsXcsrtVujNg_GY5MTkTKxKDJ---1J0",
    authDomain: "resourcehub-8c1f4.firebaseapp.com",
    projectId: "resourcehub-8c1f4",
    storageBucket: "resourcehub-8c1f4.appspot.com",
    messagingSenderId: "278307611427",
    appId: "1:278307611427:web:ddc00adfbb03b8eda5e296",
    measurementId: "G-H4SN9PCNBM"
};
export {firebaseConfig};

// Import Firebase if you haven't already
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase (make sure to add your Firebase config here)
// const firebaseConfig = { /* Your Firebase config here */ };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Protect the main page
document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in, allow access
      console.log("User is logged in:", user);
    } else {
      // No user is signed in, redirect to the login page
      window.location.href = "login.html";
    }
  });
});


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const signoutBtn = document.querySelector('#signoutbtn');
signoutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
      location.href = "index.html";
    })
    .catch((error) => {
      alert('Error signing out: ', error);
    });
});
