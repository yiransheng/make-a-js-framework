import React from "./lib";

export default function App(state) {
  return (
    <div>
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
