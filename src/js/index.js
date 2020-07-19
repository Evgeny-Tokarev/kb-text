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
  if (fl == 0) {
    slides[1].classList.add("slider__img__big");
    fl = 1;
  } else {
    slides[1].classList.remove("slider__img__big");
    fl = 0;
  }
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
let portfMenuItems = document.querySelectorAll(".portfolio__menu>li");
let portfItems = document.querySelectorAll(".portfolio__item");
let bestWorks = document.querySelectorAll(".bestworks");
let prototips = document.querySelectorAll(".prototips");
let seo = document.querySelectorAll(".SEO");
let posts = document.querySelectorAll(".posts");

for (let i = 0; i < portfMenuItems.length; i++) {
  portfMenuItems[i].addEventListener("click", () => showItems(i));
}

// function addAll() {
// 	portfMenuItems[0].classList.remove("black-text");
// 	portfMenuItems[0].classList.add("red-text");
// 	for (let i = 0; i < portfItems.length; i++) {
// 		portfItems[i].classList.add("portfolio__item-shown");
// 	}
// }

function removeAll() {
  for (let i = 0; i < portfMenuItems.length; i++) {
    portfMenuItems[i].classList.remove("red-text");
    portfMenuItems[i].classList.add("black-text");
  }
  for (let i = 0; i < portfItems.length; i++) {
    portfItems[i].classList.remove("portfolio__item-shown");
  }
}

showItems(0);

function showItems(n) {
  switch (n) {
    case 0:
      removeAll();
      portfMenuItems[0].classList.remove("black-text");
      portfMenuItems[0].classList.add("red-text");
      for (let i = 0; i < bestWorks.length; i++) {
        bestWorks[i].classList.add("portfolio__item-shown");
      }
      break;
    case 1:
      removeAll();
      portfMenuItems[1].classList.remove("black-text");
      portfMenuItems[1].classList.add("red-text");
      for (let i = 0; i < prototips.length; i++) {
        prototips[i].classList.add("portfolio__item-shown");
      }
      break;
    case 2:
      removeAll();
      portfMenuItems[2].classList.remove("black-text");
      portfMenuItems[2].classList.add("red-text");
      for (let i = 0; i < seo.length; i++) {
        seo[i].classList.add("portfolio__item-shown");
      }
      break;
    case 3:
      removeAll();
      portfMenuItems[3].classList.remove("black-text");
      portfMenuItems[3].classList.add("red-text");
      for (let i = 0; i < posts.length; i++) {
        posts[i].classList.add("portfolio__item-shown");
      }
      break;
  }
}

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
