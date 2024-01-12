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

    /* setLabel(form, "surname", "Sobrenome:") */
    setInput(form, "surname", "text", "Sobrenome:");
};

/* function setLabel(form, el, label) {
    labelName = `label${el}`
    labelName = document.createElement("label");
    
    labelName.setAttribute("for", `user_${el}`)

    labelName.textContent = `${label}`;
    form.appendChild(labelName);
} */

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