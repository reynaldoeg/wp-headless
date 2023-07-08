import { wrapper, message as messageEl } from "../config";
import { getEl, createEl, removeEl } from "../helpers";


/**
 * Render a notice
 *
 * @export
 * @param {string} type
 */
export function render(type) {
    const messages = {
        saved: "This post has been saved!",
        loggedin: "Welcome! You are logged in!",
        loggedout: "You are loged out!",
        updated: "This post has been updated!",
        required: "All fields are required!",
        failed: "This action failed :(",
        deleted: "This post has been deleted!"
    }

    const message = createEl("div");
    message.id = messageEl;
    message.classList.add(type);
    message.innerHTML = `<p>${messages[type]}</p>`;

    removeEl(messageEl);

    const container = getEl(wrapper);
    container.insertBefore(message, container.childNodes[0]);

    setTimeout(() => {
        removeEl(messageEl);
    }, 1600);
}