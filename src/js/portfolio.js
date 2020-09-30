import { menuOperating } from "./menuOperating";
import { qsa } from "./lib/utils";
let hash = location.hash.substring(1);

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

export { sections as prototipItems };
