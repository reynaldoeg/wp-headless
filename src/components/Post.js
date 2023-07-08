// Import components
import { render as Posts, clear as clearPosts } from "./Posts";
import { loadPost } from "./Editor";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers";
import { main, backBtn } from "../config";

/**
 *
 */
export function render() {
    const article = createEl("article");
    article.classList.add("post");
    article.innerHTML = `
        <p><a id="${backBtn}" href="#">&lt; Back to Posts</a></p>
        <h1 class="entry-title">${state.post.title.rendered}</a></h1>
        <div class="entry-content">${state.post.content.rendered}</div>
    `;

    article.querySelector(`#${backBtn}`).addEventListener("click", event => {
        event.preventDefault();
        setState("post", null);
        Posts();
    });

    if (state.loggedIn) {
        article.appendChild(editLink(state.post));
    }

    clearPosts();

    getEl(main).appendChild(article);
}

/**
 * Create an edit link for a post
 *
 * @export
 * @param {Object} post
 */
export function editLink(post) {

    const link = createEl("a");
    link.href = "#edit-post";
    link.classList.add("edit");
    link.innerText = "Edit";

    link.addEventListener("click", () => {
        setState("editorPost", post.id);
        loadPost();
    });

    return link;
}
