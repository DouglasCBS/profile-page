/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const register = document.getElementById(\"register\");\nconst main = document.getElementById(\"main\");\nconst body = document.querySelector(\"body\");\n\nregister.addEventListener(\"click\", registerForm);\n\nfunction registerForm() {\n    main.remove();\n    const regMain = document.createElement(\"div\");\n    body.appendChild(regMain);\n    \n    const form = document.createElement(\"form\");\n    regMain.appendChild(form);\n    \n    setInput(form, \"name\", \"text\", \"Nome:\");\n\n    /* setLabel(form, \"surname\", \"Sobrenome:\") */\n    setInput(form, \"surname\", \"text\", \"Sobrenome:\");\n};\n\n/* function setLabel(form, el, label) {\n    labelName = `label${el}`\n    labelName = document.createElement(\"label\");\n    \n    labelName.setAttribute(\"for\", `user_${el}`)\n\n    labelName.textContent = `${label}`;\n    form.appendChild(labelName);\n} */\n\nfunction setInput(form, el, type, label) {\n    labelName = `label${el}`\n    labelName = document.createElement(\"label\");\n    \n    labelName.setAttribute(\"for\", `user_${el}`)\n\n    labelName.textContent = `${label}`;\n    form.appendChild(labelName);\n\n    let inputName = `input${el}`\n    inputName = document.createElement(\"input\");\n    \n    inputName.setAttribute(\"type\", type);\n    inputName.setAttribute(\"name\", el);\n    inputName.setAttribute(\"id\", `user_${el}`);\n\n    form.appendChild(inputName);\n  }\n\n//# sourceURL=webpack://profile-page/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;