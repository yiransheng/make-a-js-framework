export default function(state, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  if (action.type === "DECREMENT") {
    return Math.max(0, state - 1);
  }
  if (action.type === "CHANGE_COUNTER") {
    const value = isNaN(action.payload) ? state : Math.round(action.payload);
    return Math.max(0, value);
  }
  return state;
}
