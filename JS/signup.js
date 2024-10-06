const firebaseConfig = {
  apiKey: "AIzaSyCDYsXcsrtVujNg_GY5MTkTKxKDJ---1J0",
  authDomain: "resourcehub-8c1f4.firebaseapp.com",
  projectId: "resourcehub-8c1f4",
  storageBucket: "resourcehub-8c1f4.appspot.com",
  messagingSenderId: "278307611427",
  appId: "1:278307611427:web:ddc00adfbb03b8eda5e296",
  measurementId: "G-H4SN9PCNBM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector(".registration.form");
const loginForm = document.querySelector(".login.form");
const forgotForm = document.querySelector(".forgot.form");
const container = document.querySelector(".container");
const signupBtn = document.querySelector(".signupbtn");
const anchors = document.querySelectorAll("a");
anchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    const id = anchor.id;
    switch (id) {
      case "loginLabel":
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        forgotForm.style.display = "none";
        break;
      case "signupLabel":
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        forgotForm.style.display = "none";
        break;
      case "forgotLabel":
        signupForm.style.display = "none";
        loginForm.style.display = "none";
        forgotForm.style.display = "block";
        break;
    }
  });
});

// const verificationActionCodeSettings = {
//   url: 'https://student-resource-hub.vercel.app/email-verification.html', // Unique URL for email verification
//   handleCodeInApp: true,
// };

// signup action
signupBtn.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      user
        .sendEmailVerification()
        .then(() => {
          alert(
            "Verification email sent. Please check your inbox and verify your email before signing in."
          );
        })
        .catch((error) => {
          alert("Error sending verification email: " + error.message);
        });
      console.log("User data saved to Firestore");
      firestore.collection("users").doc(uid).set({
        name: name,
        username: username,
        email: email,
      });
      signupForm.style.display = "none";
      loginForm.style.display = "block";
      forgotForm.style.display = "none";
    })
    .catch((error) => {
      alert("Error signing up: " + error.message);
    });
});

// login action
const loginBtn = document.querySelector(".loginbtn");
loginBtn.addEventListener("click", () => {
  const email = document.querySelector("#inUsr").value.trim();
  const password = document.querySelector("#inPass").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log("User is signed in with a verified email.");
        location.href = "main.html";
      } else {
        alert("Please verify your email before signing in.");
      }
    })
    .catch((error) => {
      alert("Error signing in: " + error.message);
      console.log("Error signing in: " + error.message);
    });
});

// const actionCodeSettings = {
//   url: 'https://student-resource-hub.vercel.app/password-reset.html', // Unique URL for password reset
//   handleCodeInApp: true,
// };


// forgot password action
const forgotBtn = document.querySelector(".forgotbtn");
forgotBtn.addEventListener("click", () => {
  const emailForReset = document.querySelector("#forgotinp").value.trim();
  if (emailForReset.length > 0) {
    auth
      .sendPasswordResetEmail(emailForReset)
      .then(() => {
        alert(
          "Password reset email sent. Please check your inbox to reset your password."
        );
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        forgotForm.style.display = "none";
      })
      .catch((error) => {
        alert("Error sending password reset email: " + error.message);
      });
  }
});
