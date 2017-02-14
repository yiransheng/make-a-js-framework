import { entries, IO } from "./utils";

function createTextNode(text) {
  return [document.createTextNode(text), []];
}

const eventAttribs = new Map(
  entries({
    onClick: (transform, domNode) => [domNode, "click", transform],
    onChange: (transform, domNode) => [domNode, "change", transform]
  })
);

function createElement(vnode) {
  if (typeof vnode === "string") {
    return createTextNode(vnode);
  }

  const { tag, attrs = {}, children = "" } = vnode;
  const node = document.createElement(tag);

  const events = [];
  for (const [attr, value] of entries(attrs)) {
    if (eventAttribs.has(attr)) {
      events.push(eventAttribs.get(attr)(value, node));
    } else if (attr === "className") {
      node.className = value;
    } else if (value !== undefined) {
      node.setAttribute(attr, value);
    }
  }

  return (Array.isArray(children) ? children : [children])
    .map(createElement)
    .reduce(appendChild, [node, events]);
}

function appendChild([node, events], [childNode, childEvents]) {
  node.appendChild(childNode);
  return [node, [...events, ...childEvents]];
}

export function mount(host, vnode) {
  return new IO(() => {
    host.innerHTML = "";
    const [node, events] = createElement(vnode);
    host.appendChild(node);

    const dispose = new WeakMap();
    const actionPromises = events.map(([node, eventName, mapper]) => {
      return new Promise(resolve => {
        const listener = e => {
          events.forEach(([node]) => {
            node.removeEventListener(eventName, dispose.get(node));
          });
          resolve(mapper(e));
        };
        dispose.set(node, listener);
        node.addEventListener(eventName, listener);
      });
    });

    return Promise.race(actionPromises);
  });
}
