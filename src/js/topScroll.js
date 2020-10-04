import { qs, qsa } from "./lib/utils";
// Плавный скролл при нажатии на пункты меню
let button = qs(".top-scroll");
function goTop(burger) {
  let anchors = qsa(
    ".main-menu a,.burger__menu a,.call-to-action__buttons a,.top-scroll"
  );
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (event) {
      if (!!burger) burger.checked = false;

      let anchorID = anchor.getAttribute("href");
      let targetElement = qs("" + anchorID);
      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 10);
    }
  }
}

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    button.classList.add("top-scroll_show");
  }
  if (scrolled < coords) {
    button.classList.remove("top-scroll_show");
  }
}
export { goTop };
export { trackScroll };
