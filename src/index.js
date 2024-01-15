import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import "./style.css";


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
const auth = getAuth();

const colRef = collection(db, "users");

const register = document.getElementById("register");
const main = document.getElementById("main");
const body = document.querySelector("body");

register.addEventListener("click", registerForm);

function registerForm() {
    body.removeChild(main);
    const regMain = document.createElement("div");
    regMain.classList.add("regMain");
    body.appendChild(regMain);
    
    const form = document.createElement("form");
    form.setAttribute("id", "regForm");
    regMain.appendChild(form);
    
    setInput(form, "name", "text", "Nome:");

    setInput(form, "surname", "text", "Sobrenome:");

    setInput(form, "email", "email", "Email:");

    setInput(form, "password", "password", "Senha:");
    setInput(form, "confPass", "password", "Confirmar Senha:");

    const buttonDiv = document.createElement("div");
    form.appendChild(buttonDiv);

    const regButton = document.createElement("button");
    buttonDiv.appendChild(regButton);
    regButton.textContent = "Registrar";

    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("type", "button");
    cancelBtn.textContent = "Cancelar";
    buttonDiv.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        regMain.remove();
        body.appendChild(main);
    });



    const regUser = document.getElementById("regForm");
    regUser.addEventListener("submit", (e) => {
        e.preventDefault();
        let password = document.getElementById("user_password");
        let confPassword = document.getElementById("user_confPass");
        if (checkPassword(password, confPassword)) {
            
            const uEmail = regUser.email.value
            const uPass = regUser.password.value

            createUserWithEmailAndPassword(auth, uEmail, uPass)
                .then((cred) => {
                    addDoc(colRef, {
                        name: regUser.name.value,
                        surname: regUser.surname.value,
                        email: regUser.email.value,
                        password: regUser.password.value,
                    })
                    regMain.remove();
                    body.appendChild(main);
                })
                .catch((err) => {
                    const error = err.code;
                    switch (error) {
                        case "auth/email-already-in-use":
                            alert("Este email já está sendo utilizado.");
                            break;
                        case "auth/invalid-email":
                            alert("Email inválido.");
                            break;
                        case "auth/weak-password":
                            alert("A senha deve conter 6 ou mais caracteres.");
                            break;
                        default:
                            alert(err.code);
                    }
                });
            
        }
        else alert("As senhas não coincidem.");
    });
};


function setInput(form, el, type, label) {
    let formDiv = document.createElement("div");
    form.appendChild(formDiv);

    let labelName = `label${el}`
    labelName = document.createElement("label");
    
    labelName.setAttribute("for", `user_${el}`)

    labelName.textContent = `${label}`;
    formDiv.appendChild(labelName);

    let inputName = `input${el}`
    inputName = document.createElement("input");
    
    inputName.setAttribute("type", type);
    inputName.setAttribute("name", el);
    inputName.setAttribute("id", `user_${el}`);
    inputName.setAttribute("required", "");

    formDiv.appendChild(inputName);
  }

function checkPassword(password, confPassword) {
    if ((password.value.length !== 0 && confPassword.value.length !== 0) && (confPassword.value !== password.value)) {
        password.classList.add("failPass");
        confPassword.classList.add("failPass");
        return false
    }
    else {
        password.classList.remove("failPass");
        confPassword.classList.remove("failPass");
        return true
    }
};


const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const uEmail = loginForm.email.value;
    const uPass = loginForm.password.value;

    signInWithEmailAndPassword(auth, uEmail, uPass)
    .then(() => {

    })
    .catch((err) => {
        const error = err.code;
        switch (error) {
            case "auth/invalid-email":
                alert("Email inválido.");
                break;
            case "auth/missing-password":
                alert("Senha faltando.");
                break;
            case "auth/invalid-credential":
                alert("Informações incorretas! Verifique se o email e a senha estão corretos.");
                break;
            case "auth/too-many-requests":
                alert("Aguarde um momento e tente novamente.");
                break;
        default:
            alert(error);
        }
    });

});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uEmail = user.email
        const q = query(colRef, where("email", "==", uEmail));

         getDocs(q)
        .then((snapshot) => {
            let users = []
            snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data() })
            })
            const username = users[0].name
            const usersurname = users[0].surname
            showProfile(username, usersurname)
        })
        .catch(err => {
        console.log(err.message)
        });

    }
    else {

    }
});

function showProfile(username, usersurname) {
    body.removeChild(main);
    const profDiv = document.createElement("div");
    profDiv.classList.add("profDiv");
    body.appendChild(profDiv);
    const header = document.createElement("h1");
    profDiv.appendChild(header);
    header.textContent = `Bem vindo ${username} ${usersurname}`

    const logOut = document.createElement("button");
    logOut.setAttribute("type", "button");
    logOut.textContent = "Logout";
    profDiv.appendChild(logOut);
    logOut.addEventListener("click", () => {
        signOut(auth)
        .then(() => {
            profDiv.remove();
            body.appendChild(main);
        });
    })

}