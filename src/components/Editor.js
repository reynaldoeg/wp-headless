// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

import { state, setState } from "../state";
import { getEl, createEl, isRendered } from "../helpers";
import { primary, main, editor, editorTitle, editorContent } from "../config";
import { save, update } from "../crud";

/**
 * Render
 *
 * @export
 */
export function render() {
    // Make sure logged out and form is not rendered already
    if (state.loggedIn === false || isRendered(editor)) {
        return;
    }

    // Setup the logout form
    const form = createEl("form");
    form.id = editor;
    form.innerHTML = `
        <h3 class="add-new-post">Add New Post</h3>
        <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
        <div id="${editorContent}"></div>
        <p><button class="button">Save</button></p>
    `;

    getEl(primary).insertBefore(form, getEl(main));

    // Initialize the quill editor
    var quill = new Quill(`#${editorContent}`, {
        theme: "snow"
    });

    getEl(editor).addEventListener("submit", process);
}

/**
 * Load the editor with current post from editorPost state
 *
 * @export
 */
export function loadPost() {
    // Get the token for an authorized request
    const token = Cookies.get(state.token);

     // Setup an authenticated request for posts
    axios
        .get(state.restUrl + "wp/v2/posts/" + state.editorPost, {
            // Set context to edit to get raw post content for editing
            params: {
                context: "edit"
            },
            // Set headers for authenticated request
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            // Go back up to the edit form
            window.scrollTo(0, 50);
            // Set the value of the post title input field
            getEl(editorTitle).value = response.data.title.raw;
            // Set the value of the post content from the editor
            const contentEditor = Quill.find(getEl(editorContent));
            // Set the editor to receive the raw content for editing
            contentEditor.root.innerHTML = response.data.content.raw;
            // Make sure to bind the post to the save method
        });
}


/**
 *
 * @param {*} event
 */
export function process(event) {
    const quillEditor = Quill.find(getEl(editorContent));

    const post = {
        id: state.editorPost,
        title: getEl(editorTitle).value,
        content: quillEditor.root.innerHTML,
        status: "publish"
    }

    event.preventDefault();

    if (!post.title || !post.content) {
        Notice(render("required"));
        return;
    }

    if (!state.editorPost) {
        save(post);
    } else {
        update(post);
    }

}


export function clear() {
    getEl(editorTitle).value = "";
    const quillEditor = Quill.find(getEl(editorContent));
    quillEditor.root.innerHTML = "";

    setState("editorPost", null);
}