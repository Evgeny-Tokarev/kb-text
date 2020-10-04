import { menuOperating } from "./menuOperating";
import { qsa, qs } from "./lib/utils";
import { goTop } from "./topScroll";
import { trackScroll } from "./topScroll";
let hash = location.hash.substring(1);
if (!!hash) {
  console.log(hash);
} else {
  hash = 0;
}
qsa(".swiper-container").forEach((domElement) => {
  new Swiper(domElement, {
    autoHeight: true, //enable auto height
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

let menuItems = qsa(".main-menu > li");
let sections = qsa("section[data-section]");

menuOperating(
  menuItems,
  sections,
  "white-bg",
  "black-bg",
  "section--hidden",
  hash
);
goTop();
window.addEventListener("scroll", trackScroll);
export { sections as prototipItems };
