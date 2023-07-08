import { init as Authentication } from "./components/Authentication";
import { init as Header } from "./components/Header";
import { init as Posts } from "./components/Posts";

(function init() {
  Authentication();
  Header();
  Posts();
})();
