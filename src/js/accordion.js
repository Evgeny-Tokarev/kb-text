function accord() {
  function accordionOperating(number) {
    let text = accordion[number].children[1];
    let head = accordion[number].children[0];
    text.classList.toggle("show");
    if (text.classList.contains("show")) {
      text.style.maxHeight = heights[number] + "px";
    } else {
      text.style.maxHeight = 0;
    }

    head.classList.toggle("show");
  }
  accordion.forEach((item, i) => {
    item.children[0].addEventListener("click", () => accordionOperating(i));
  });
}
export { accord };
