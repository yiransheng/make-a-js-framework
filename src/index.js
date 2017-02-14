import App from "./App";
import { app } from "./lib";
import reducer from "./reducer";

const main = app(App, reducer, document.getElementById("root"));

main(0).runIO();
