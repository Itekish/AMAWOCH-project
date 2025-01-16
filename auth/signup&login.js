// Import the functions 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";



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

const createAccount = document.getElementById('createAccount');
const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');
const logInMail = document.getElementById('logInMail');
const logInPassword = document.getElementById('logInPassword');
const signin = document.getElementById('signin');
const gotoSignUp = document.getElementById('gotoSignUp');
const gotoSignIn = document.getElementById('gotoSignIn');
let errorMsg = document.getElementById('errorMsg');
let logInErrorMsg = document.getElementById('logInErrorMsg');
let logInError = document.getElementById('logInErrorMsg');

gotoSignIn.addEventListener('click', ()=> {
    signUp.style.display = "none";
    logIn.style.display = "block";

    showError('')
})

gotoSignUp.addEventListener('click', ()=> {
     signUp.style.display = "block";
    logIn.style.display = "none";

    showError('')
})

function showError(message){
    errorMsg.textContent = message;
    logInErrorMsg.textContent = message;

    console.log(errorMsg.innerHTML);
    
    setTimeout(() => {
        errorMsg.style.display = 'none'
    }, 10000);
}

createAccount.addEventListener('click', ()=> {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();
    const db = getFirestore();
    
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCrediential)=> {
        const user = userCrediential.user;
        const userData = {
            email: email,
            username: username
        } 
        const docRef = doc(db, 'users', user.uid);
        console.log(docRef);
        
        showError(`Account created successfully`);
        setDoc(docRef, userData)

        .then(()=> {
            window.location.href = '../otherHtmlFiles/home.html'
        })
        .catch((error)=>{
            console.log('error writing doc', error);
            
        });
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
            showError('User already exists.Try a new e-mail or password')
        }else if (errorMessage == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            showError('Password is weak')
        } else {
            showError('Unable to create user')
        }
    })
})

const signIn = document.getElementById('signin');

signIn.addEventListener('click', (e)=>{
    const email = document.getElementById('logInMail').value;
    const password = document.getElementById('logInPassword').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)

    .then((userCrediential)=> {
        showError('Sign in successful')
        const user = userCrediential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = '../otherHtmlFiles/home.html'
}) 
.catch((error)=> {
    const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        if (errorMessage == 'Firebase: Error (auth/invalid-credential).') {
            logInErrorMsg.textContent = 'Incorrect e-mail or password'
        }else{
            logInErrorMsg.textContent = 'Account does not exist.'
        }
})

})