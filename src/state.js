// Set state object with values that are changed programatically
const state = {
  loggedIn: false,
  token: "wp-token",
  restUrl: "http://wordpress.local.com/wp-json/",
  siteName: "Site Name",
  siteDescription: "Just another decoupled site",
  posts: null,
  post: null,
  editorPost: null
};
/**
 * Handles updating the state
 *
 * @param {string} toSet The property from state to set
 * @param {*} newValue The new value to set
 */
const setState = (toSet, newValue) => {
  state[toSet] = newValue;
};
export { state, setState };
