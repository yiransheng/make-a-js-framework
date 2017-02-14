import React from "./lib";

function Title(props) {
  const {counter, children} = props;
  return (
    <div>
      <h1>{children}<sup>{counter.toString()}</sup></h1>
      <hr />
    </div>
  );
}

export default function App(state) {
  return (
    <div>
      <Title counter={state}>
        Counter Example
      </Title>
      <button onClick={() => ({ type: "DECREMENT" })}>
        -
      </button>
      <button onClick={() => ({ type: "INCREMENT" })}>
        +
      </button>
      <span> Counter: </span>
      <input
        value={state.toString()}
        onChange={e => ({ type: "CHANGE_COUNTER", payload: e.target.value })}
      />
    </div>
  );
}
