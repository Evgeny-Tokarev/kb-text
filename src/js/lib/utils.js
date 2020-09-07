export const qsa = (selector, root = document) => {
  return Array.from(root.querySelectorAll(selector));
};

export const qs = (selector, root = document) => {
  return root.querySelector(selector);
};
