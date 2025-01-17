import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMBSJfgpF7ykJ286-CbFJRKQrFmW9S55k",
    authDomain: "amawoch.firebaseapp.com",
    projectId: "amawoch",
    storageBucket: "amawoch.firebasestorage.app",
    messagingSenderId: "548984002413",
    appId: "1:548984002413:web:64125645c019f4b17eec64",
    measurementId: "G-FFM5C5V7M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const createAccount = document.getElementById('createAccount');
const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');
const signIn = document.getElementById('signin');
const logOut = document.getElementById('logOut'); 
const errorMsg = document.getElementById('errorMsg');
const logInErrorMsg = document.getElementById('logInErrorMsg');

// Monitor Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log(`User logged in: ${user.email}`);
        localStorage.setItem('loggedInUserId', user.uid);

        // Display user's dashboard or redirect to a specific page
        if (window.location.pathname !== '/otherHtmlFiles/home.html') {
            window.location.href = '../otherHtmlFiles/home.html';
        }
    } else {
        // User is signed out
        console.log("User logged out");
        localStorage.removeItem('loggedInUserId');

        // Redirect to login page if necessary
        if (window.location.pathname !== '/index.html') {
            window.location.href = '../index.html';
        }
    }
});

// Log Out
if (logOut) {
    logOut.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out successfully');
                localStorage.removeItem('loggedInUserId');
                window.location.href = '../index.html';
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    });
}
