// Инициализируем wowjs
new WOW().init();

// Все блоки слайдов
let slides = document.querySelectorAll(".slider__img");

// Будет хранить URL картинок
let slider = [];
let row = document.querySelector(".slider-row");
let screen = document.querySelector("body");
let burger = document.querySelector(".burger__menu");
let button = document.querySelector("#burger__button");

for (let i = 0; i < slides.length; i++) {
  slider[i] = getComputedStyle(slides[i]).backgroundImage;
}

// Счётчики для номеров фона
let counter = [];

//Флаг для действий
let fl = 0;

// Количество картинок в строке
let leng;

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
let accordion = document.querySelectorAll(".accordion__item");
  let heights = [];
  console.log(accordion);
  accordion.forEach((item, i) => {
    heights[i] = item.children[1].offsetHeight;
    console.log(heights[i]);
    console.log(i)
    item.children[1].style.maxHeight = 0;
  });
  console.log(heights);  accordion.forEach((item, i) => {
    item.children[0].addEventListener("click", () => accordionOperating(i));
  });
  
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

function sliderOperating() {
  function lengSet() {
    if (window.matchMedia("(min-width: 800px)").matches) {
      leng = 3;
    } else {
      leng = 1;
    }
  }
  lengSet();
  for (let i = 0; i < leng; i++) {
    counter[i] = i;
  }
  if (leng == 1) {
    slides[0].style.opacity = 1;
    slides[0].classList.remove("slider__img__small");
  } else {
    slides[0].style.opacity = 0.3;
    slides[0].classList.add("slider__img__small");
    slides[2].style.opacity = 0.3;
    slides[2].classList.add("slider__img__small");
  }
}

function styleSet() {
  for (let i = 0; i < leng; i++) {
    slides[i].style.backgroundImage = slider[counter[i]];
  }
}

function leftMoveCheck() {
  if (leng == 3) {
    leftMove();
  }
}

function leftMove() {
  for (let i = 0; i < leng; i++) {
    if (counter[i] < slides.length - 1) {
      counter[i]++;
    } else {
      counter[i] = 0;
    }
  }
  styleSet();
}

function rightMove() {
  for (let i = 0; i < leng; i++) {
    if (counter[i] > 0) {
      counter[i]--;
    } else {
      counter[i] = slides.length - 1;
    }
  }
  styleSet();
}

function picGrow() {

    slides[1].classList.toggle("slider__img__big");
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
  } else {
    if (Math.abs(d) > sensitivity && trg.classList.contains("slider__img")) {
      //Проверяем, было ли движение достаточно длинным
      if (d > 0) {
        //Если значение больше нуля, значит пользователь двигал пальцем справа налево
        leftMove();
      } //Иначе он двигал им слева направо
      else {
        rightMove();
      }
    }
  }
}

sliderOperating();
styleSet();

// Клик по левой картинке
slides[0].addEventListener("click", leftMoveCheck);

// Клик по правой картинке
slides[2].addEventListener("click", rightMove);

//клик по центральной картинке
slides[1].addEventListener("click", picGrow);

// ----------------------------------------------------------------------------
// Тач события

// Начало касания
row.addEventListener("touchstart", function (e) {
  TouchStart(e);
});

// Движение пальцем по экрану
row.addEventListener("touchmove", function (e) {
  TouchMove(e);
});

// Пользователь отпустил экран
row.addEventListener("touchend", function (e) {
  TouchEnd(e);
});

// Отмена касания
row.addEventListener("touchcancel", function (e) {
  TouchEnd(e);
});

// ----------------------------------------------------------------------------

window.onresize = function () {
  sliderOperating();
};

// ----------------------------------------------------------------------------

// Меню портфолио
let menuItems = document.querySelectorAll(".portfolio__menu>li");
let portfItems = document.querySelectorAll(".portfolio__item");
let bestWorks = document.querySelectorAll(".bestworks");
let prototips = document.querySelectorAll(".prototips");
let seo = document.querySelectorAll(".SEO");
let posts = document.querySelectorAll(".posts");
import {menuOperating} from './menuOperating.js';


menuOperating(menuItems, portfItems, "black-text","red-text", "item-hidden"); 
// Плавный скролл
let anchors = document.querySelectorAll(
  ".main-menu a,.burger__menu a,.call-to-action__buttons a, .top-scroll"
);

for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    button.checked = false;
    let anchorID = anchor.getAttribute("href");
    let targetElement = document.querySelector("" + anchorID);
    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  let goTopBtn = document.querySelector(".top-scroll");

  window.addEventListener("scroll", trackScroll);

  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;
    button.checked = false;
    if (scrolled > coords) {
      goTopBtn.classList.add("top-scroll_show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("top-scroll_show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }
}
