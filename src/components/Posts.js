// Import libraries
import axios from "axios";

// Import components
import {render as Post, editLink} from "./Post";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers.js";
import { main } from "../config";

/**
 * Get post from REST API
 * 
 * @export
 * @param {*} event
 */
export function init(event) {
    if (event) event.preventDefault();

    axios
        .get(state.restUrl + "wp/v2/posts", {
            params: {
                per_page: 5
            }
        })
        .then(({data: posts}) => {
            setState("posts", posts);
            render();
        });
}

/**
 * Render
 * 
 * @export
 */
export function render() {
    clear();
    state.posts.map(post => {
        const article = createEl("article");
        article.classList.add("post");
        article.innerHTML = `
            <h2 class="entry-title">
                <a href="#${post.slug}">${post.title.rendered}</a>
            </h2>
            <div class="entry-content">${post.excerpt.rendered}</div>
        `;

        article.querySelector(".entry-title a").addEventListener("click", event => {
            event.preventDefault();
            setState("post", post);
            Post();
        });

        if (state.loggedIn) {
            article.appendChild(editLink(post));
        }

        getEl(main).appendChild(article);
    });
}


/**
 * Clear the main post area
 * 
 * @export
 */
export function clear() {
    getEl(main).innerHTML = "";
}