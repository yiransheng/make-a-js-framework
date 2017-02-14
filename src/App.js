import React from "./lib";

function Title(props) {
  return (
    <div>
      <h1>{props.children}</h1>
      <hr />
    </div>
  );
}

export default function App(state) {
  return (
    <div>
      <Title>Counter Example</Title>
      <button onClick={() => ({ type: "DECREMENT" })}>
        -
      </button>
      <span>{state.toString()}</span>
      <button onClick={() => ({ type: "INCREMENT" })}>
        +
      </button>
      <input
        value={state.toString()}
        onChange={e => ({ type: "CHANGE_COUNTER", payload: e.target.value })}
      />
    </div>
  );
}
