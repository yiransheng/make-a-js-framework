import {entries} from './utils';

function createElement(type, props, ...children) {
  if (typeof type === "string") {
    return createPrimitiveElement(type, props, children);
  }
  // type is a function / stateless component
  const compProps = {
    ...props,
    children
  };
  return type(compProps);
}

function createPrimitiveElement(tag, props, children='') {
  const attrs = {};
  if (props) {
    for (const [key, value] of entries(props)) {
      if (key && key.charAt(0) !== '_' /* jsx debug properties */) {
        attrs[key] = value;
      }
    }
  }
  return {
    tag,
    attrs,
    children: children || []
  };
}

const React = { createElement };

if (window) {
  window.React = React;
}

export default React;
