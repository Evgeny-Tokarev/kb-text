// import "swiper/swiper-bundle.css";
// import "../scss/index.css";

import "./lib/polyfills";
import "regenerator-runtime/runtime";
import "core-js/stable";
import Swiper from "swiper/bundle";
import { qs, qsa } from "./lib/utils";
import { menuOperating } from "./menuOperating.js";
import { goTop } from "./topScroll";
import { trackScroll } from "./topScroll";

new WOW().init();

var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

let screen = qs("body");
let burger = qs(".burger__menu");
let button = qs("#burger__button");

function removeBurger(e) {
  if (
    !e.target.matches(".burger, .burger *") &&
    getComputedStyle(burger).left == 0 + "px"
  ) {
    button.checked = false;
  }
}

window.addEventListener("click", removeBurger);

// Начало касания
burger.addEventListener("touchstart", function (e) {
  TouchStart(e);
});

// Движение пальцем по экрану
burger.addEventListener("touchmove", function (e) {
  TouchMove(e);
});

// Пользователь отпустил экран
burger.addEventListener("touchend", function (e) {
  TouchEnd(e);
});

// Отмена касания
burger.addEventListener("touchcancel", function (e) {
  TouchEnd(e);
});

// Аккордион

let accordion = qsa(".accordion__item");
let heights = [];
accordion.forEach((item, i) => {
  heights[i] = item.children[1].offsetHeight;
  item.children[1].style.maxHeight = 0;
  item.children[0].addEventListener("click", () => accordionOperating(i));
});
window.addEventListener("scroll", accordScroll);

function accordScroll() {
  accordion.forEach((item, i) => {
    let target = item.children[1];
    // Проверка на скролл открытого элемента аккордеона за область экрана вниз или вверх

    if (
      target.classList.contains("show") &&
      (window.pageYOffset + target.getBoundingClientRect().top >
        window.pageYOffset + document.documentElement.clientHeight ||
        window.pageYOffset + target.getBoundingClientRect().bottom <
          window.pageYOffset)
    ) {
      accordionOperating(i);
    }
  });
}

function accordionOperating(number) {
  let head = accordion[number].children[0];
  let text = accordion[number].children[1];
  // Закрывает иные открытые элементы
  accordion.forEach((item, i) => {
    if (i !== number && item.children[0].classList.contains("show")) {
      item.children[1].style.maxHeight = 0;
      item.children[0].classList.toggle("show");
      item.children[1].classList.toggle("show");
    }
  });

  // Открывает элемент
  text.classList.toggle("show");
  if (text.classList.contains("show")) {
    text.style.maxHeight = heights[number] + "px";
  } else {
    text.style.maxHeight = 0;
  }

  head.classList.toggle("show");
}

// Работа с тачскрином

// Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 20;

let touchStart = null; //Точка начала касания
let touchPosition = null; //Текущая позиция

function TouchStart(e) {
  //Получаем текущую позицию касания
  touchStart = e.changedTouches[0].clientX;
  touchPosition = touchStart;
}

function TouchMove(e) {
  //Получаем новую позицию

  touchPosition = e.changedTouches[0].clientX;
}

function TouchEnd(e) {
  let trg = e.target;
  CheckAction(trg); //Определяем, какой жест совершил пользователь
  //Очищаем позиции
  touchStart = null;
  touchPosition = null;
}

function CheckAction(trg) {
  var d =
    //Получаем расстояния от начальной до конечной точек по обеим осям
    touchStart - touchPosition;
  if (
    Math.abs(d) > sensitivity &&
    (trg.classList.contains("burger__menu") ||
      trg.closest(".burger__menu") != null) &&
    d > 0
  ) {
    button.checked = false;
  }
}
// ----------------------------------------------------------------------------

// Меню портфолио
let menuItems = qsa(".portfolio__menu>li");
let portfItems = qsa(".portfolio__item");
menuOperating(
  menuItems,
  portfItems,
  "black-text",
  "red-text",
  "item-hidden",
  0
);

// Отзывы

let review = qsa(".review__content");
let seeMore = qsa(".see-more__button");
seeMore.forEach((item, i) => {
  item.addEventListener("click", () => reviewOperating(i));
});

function reviewOperating(n) {
  review[n].classList.toggle("full-size");
  review[n].parentElement.classList.toggle("full-size-wrapper");
  if (review[n].classList.contains("full-size")) {
    review[n].nextElementSibling.innerHTML = "свернуть";
  } else {
    review[n].nextElementSibling.innerHTML = "читать всё...";
  }
}
goTop(button);
window.addEventListener("scroll", trackScroll);
