import { state } from "../state";
import { getEl, createEl, isRendered } from "../helpers.js";
import { sidebar, logoutForm } from "../config";

/**
 * Render
 *
 * @export
 */
export function render() {
    // Make sure logged out and form is not rendered already
    if (state.loggedIn === false || isRendered(logoutForm)) {
        return;
    }

    // Setup the logout form
    const form = createEl("form");
    form.id = logoutForm;
    form.innerHTML = `
        <button class="button submit">
            Logout
        </button>
    `;

    // Add the form to the page
    getEl(sidebar).appendChild(form);
}
