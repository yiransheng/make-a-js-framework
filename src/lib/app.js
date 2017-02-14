import { mount } from "./mount";
import { curry } from "./utils";

const app = (render, reducer, host) => {
  if (reducer.length === 2) {
    reducer = curry(reducer);
  }
  const run = state =>
    mount(host, render(state)).map(reducer(state)).chain(run);
  return run;
};

export { app };
