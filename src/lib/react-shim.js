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
  return {
    tag,
    attrs: props || {},
    children: children || []
  };
}

const React = { createElement };

if (window) {
  window.React = React;
}

export default React;
