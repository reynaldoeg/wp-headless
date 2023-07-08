// Import libraries
import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

// Import components
import { init as Posts } from "./Posts.js";
import { render as LoginForm } from "./LoginForm";
import { render as LogoutForm } from "./LogoutForm.js";
import { render as Editor } from "./Editor.js";
import { render as Notice} from "./Notice";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl, removeEl } from "../helpers.js";
import { loginBtn, logoutBtn, loginForm, logoutForm, username, password, editor } from "../config";


/**
 * Authentication
 * 
 * @export
 */
export function init() {

    if (Cookies.get(state.token) === undefined) {
        console.log("Logged out...");
        logout();
        initLogin();
    } else {
        console.log("Logged in!");
        login();
        initLogout();
    }
}


/**
 * Handles the login process
 *
 * @export
 */
export function login() {
    // Set the loggedIn statis to true
    setState("loggedIn", true);
    // Toggle login/logout forms
    removeEl(loginForm);
    Notice("loggedin");
    LogoutForm();
    Editor();
    // Init and render posts
    Posts();
}

/**
 * Handles the logout process
 *
 * @export
 */
export function logout() {
    // Set the loggedIn statis to false
    setState("loggedIn", false);
    // Toggle login/logout forms
    LoginForm();
    removeEl(logoutForm);
    Notice("loggedout");
    removeEl(editor);
    // Init and render posts
    Posts();
}


/**
 * Setup the login process including login event handler
 *
 * @export
 */
export function initLogin() {

    // Replace login button with a clone to remove event listeners
    const prevLogin = getEl(loginBtn);
    const newLogin = prevLogin.cloneNode(true);
    prevLogin.parentNode.replaceChild(newLogin, prevLogin);

    // Setup event listener for login form
    getEl(loginForm).addEventListener("submit", event => {
        // Prevent form submission
        event.preventDefault();

        // Get username and password from form
        const creds = {
            username: getEl(username).value,    //reynaldoeg
            password: getEl(password).value     //9PDVDFBXvsvi2Ni
        };

        axios({
            method: "post",
            url: state.restUrl + "jwt-auth/v1/token",
            data: formurlencoded(creds),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
            console.log(response);
            if (200 === response.status) {
                Cookies.set(state.token, response.data.token, {
                    expires: 1,
                    secure: false
                });
                init();
            }
        })
        .catch(error => console.error(error));

    });
}


export function initLogout() {

    getEl(logoutForm).addEventListener("submit", event => {
        event.preventDefault();

        Cookies.remove(state.token, {secure: false});

        init();
    })
}