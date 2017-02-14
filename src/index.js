import { app } from "./lib";

import App from "./App";
import reducer from "./reducer";

const main = app(App, reducer, document.getElementById("root"));

main(/* initialState = */ 0).runIO();
