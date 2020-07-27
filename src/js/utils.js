export const qsa = (selector, root = document) => {
  return Array.from(root.querySelectorAll(selector));
};
