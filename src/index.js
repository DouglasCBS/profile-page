import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNHXwd0SF24bu1WmZg-JkACf-UblkP0d4",
  authDomain: "profile-autentication.firebaseapp.com",
  databaseURL: "https://profile-autentication-default-rtdb.firebaseio.com",
  projectId: "profile-autentication",
  storageBucket: "profile-autentication.appspot.com",
  messagingSenderId: "56397108693",
  appId: "1:56397108693:web:5aba7479226216b0ba195c",
  measurementId: "G-NFTJPJKFTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "users");
getDocs(colRef)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id })
        })
        /* console.log(users) */
    })
    .catch(err => {
        console.log(err.message)
    });


const register = document.getElementById("register");
const main = document.getElementById("main");
const body = document.querySelector("body");

register.addEventListener("click", registerForm);

function registerForm() {
    main.remove();
    const regMain = document.createElement("div");
    body.appendChild(regMain);
    
    const form = document.createElement("form");
    regMain.appendChild(form);
    
    setInput(form, "name", "text", "Nome:");

    setInput(form, "surname", "text", "Sobrenome:");
};


function setInput(form, el, type, label) {
    labelName = `label${el}`
    labelName = document.createElement("label");
    
    labelName.setAttribute("for", `user_${el}`)

    labelName.textContent = `${label}`;
    form.appendChild(labelName);

    let inputName = `input${el}`
    inputName = document.createElement("input");
    
    inputName.setAttribute("type", type);
    inputName.setAttribute("name", el);
    inputName.setAttribute("id", `user_${el}`);

    form.appendChild(inputName);
  }