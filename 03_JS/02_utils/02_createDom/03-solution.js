const createDom = (root) => {
  // Create node using root.type
  const node = document.createElement(root.type);

  // Handle root attributes
  if (root.attributes != null) {
    for (const [attr, val] of Object.entries(root.attributes)) {
      node.setAttribute(attr, val);
    }
  }

  // Handle children with recursion
  root.children?.forEach((child) => {
    // We are not using appendChild since append allows us to append string simply
    // If you want to use appendChild then you should create text node first for string and then append
    node.append(typeof child === "string" ? child : createDom(child));
  });

  return node;
};
