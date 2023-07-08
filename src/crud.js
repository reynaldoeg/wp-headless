// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components/Editor";
import { init as Posts } from "./components/Posts";
import { render as Notice} from "./components/Notice";

// Import configs
import { state } from "./state";

/**
 * Save a Post
 *
 * @export
 * @param {Object} post
 */
export function save(post) {
    const token = Cookies.get(state.token);

    axios({
        method: "post",
        url: state.restUrl + "wp/v2/posts",
        data: post,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    })
    .then(response => {
        console.log(response.data)
        clearEditor();
        Notice("saved");
        Posts();
    })
    .catch(error => console.error(error));
}


/**
 * Updates a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function update(post) {
    // Get the token for an authorized request
    const token = Cookies.get(state.token);
    // Update existing post
    axios({
      method: "put",
      url: state.restUrl + "wp/v2/posts/" + post.id,
      data: post,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        clearEditor();
        Notice("updated");
        Posts();
      })
      .catch(error => {
        console.error(error);
      });
  }