"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _menuOperating = require("./menuOperating.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Инициализируем wowjs
new WOW().init(); // Все блоки слайдов

var slides = document.querySelectorAll(".slider__img"); // Будет хранить URL картинок

var slider = [];
var row = document.querySelector(".slider-row");
var screen = document.querySelector("body");
var burger = document.querySelector(".burger__menu");
var button = document.querySelector("#burger__button");

for (var i = 0; i < slides.length; i++) {
  slider[i] = getComputedStyle(slides[i]).backgroundImage;
} // Счётчики для номеров фона


var counter = []; //Флаг для действий

var fl = 0; // Количество картинок в строке

var leng;

function removeBurger(e) {
  if (!e.target.matches(".burger, .burger *") && getComputedStyle(burger).left == 0 + "px") {
    button.checked = false;
  }
}

window.addEventListener("click", removeBurger); // Начало касания

burger.addEventListener("touchstart", function (e) {
  TouchStart(e);
}); // Движение пальцем по экрану

burger.addEventListener("touchmove", function (e) {
  TouchMove(e);
}); // Пользователь отпустил экран

burger.addEventListener("touchend", function (e) {
  TouchEnd(e);
}); // Отмена касания

burger.addEventListener("touchcancel", function (e) {
  TouchEnd(e);
});
var accordion = document.querySelectorAll(".accordion__item");
var heights = [];
console.log(accordion);
accordion.forEach(function (item, i) {
  heights[i] = item.children[1].offsetHeight;
  console.log(heights[i]);
  console.log(i);
  item.children[1].style.maxHeight = 0;
});
console.log(heights);
accordion.forEach(function (item, i) {
  item.children[0].addEventListener("click", function () {
    return accordionOperating(i);
  });
});

function accordionOperating(number) {
  var text = accordion[number].children[1];
  var head = accordion[number].children[0];
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

    if (window.matchMedia("(min-width: 800px)").msMatchesSelector) {
      leng = 3;
    } else {
      leng = 1;
    }
  }

  lengSet();

  for (var _i = 0; _i < leng; _i++) {
    counter[_i] = _i;
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
  for (var _i2 = 0; _i2 < leng; _i2++) {
    slides[_i2].style.backgroundImage = slider[counter[_i2]];
  }
}

function leftMoveCheck() {
  if (leng == 3) {
    leftMove();
  }
}

function leftMove() {
  for (var _i3 = 0; _i3 < leng; _i3++) {
    if (counter[_i3] < slides.length - 1) {
      counter[_i3]++;
    } else {
      counter[_i3] = 0;
    }
  }

  styleSet();
}

function rightMove() {
  for (var _i4 = 0; _i4 < leng; _i4++) {
    if (counter[_i4] > 0) {
      counter[_i4]--;
    } else {
      counter[_i4] = slides.length - 1;
    }
  }

  styleSet();
}

function picGrow() {
  slides[1].classList.toggle("slider__img__big");
} // Работа с тачскрином
// Чувствительность — количество пикселей, после которого жест будет считаться свайпом


var sensitivity = 20;
var touchStart = null; //Точка начала касания

var touchPosition = null; //Текущая позиция

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
  var trg = e.target;
  CheckAction(trg); //Определяем, какой жест совершил пользователь
  //Очищаем позиции

  touchStart = null;
  touchPosition = null;
}

function CheckAction(trg) {
  var d = //Получаем расстояния от начальной до конечной точек по обеим осям
  touchStart - touchPosition;

  if (Math.abs(d) > sensitivity && (trg.classList.contains("burger__menu") || trg.closest(".burger__menu") != null) && d > 0) {
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
styleSet(); // Клик по левой картинке

slides[0].addEventListener("click", leftMoveCheck); // Клик по правой картинке

slides[2].addEventListener("click", rightMove); //клик по центральной картинке

slides[1].addEventListener("click", picGrow); // ----------------------------------------------------------------------------
// Тач события
// Начало касания

row.addEventListener("touchstart", function (e) {
  TouchStart(e);
}); // Движение пальцем по экрану

row.addEventListener("touchmove", function (e) {
  TouchMove(e);
}); // Пользователь отпустил экран

row.addEventListener("touchend", function (e) {
  TouchEnd(e);
}); // Отмена касания

row.addEventListener("touchcancel", function (e) {
  TouchEnd(e);
}); // ----------------------------------------------------------------------------

window.onresize = function () {
  sliderOperating();
}; // ----------------------------------------------------------------------------
// Меню портфолио


var menuItems = document.querySelectorAll(".portfolio__menu>li");
var portfItems = document.querySelectorAll(".portfolio__item");
var bestWorks = document.querySelectorAll(".bestworks");
var prototips = document.querySelectorAll(".prototips");
var seo = document.querySelectorAll(".SEO");
var posts = document.querySelectorAll(".posts");
(0, _menuOperating.menuOperating)(menuItems, portfItems, "black-text", "red-text", "item-hidden"); // Плавный скролл

var anchors = document.querySelectorAll(".main-menu a,.burger__menu a,.call-to-action__buttons a, .top-scroll");

var _iterator = _createForOfIteratorHelper(anchors),
    _step;

try {
  var _loop = function _loop() {
    var anchor = _step.value;
    anchor.addEventListener("click", function (event) {
      button.checked = false;
      var anchorID = anchor.getAttribute("href");
      var targetElement = document.querySelector("" + anchorID);
      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
    var goTopBtn = document.querySelector(".top-scroll");
    window.addEventListener("scroll", trackScroll);

    function trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = document.documentElement.clientHeight;
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
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}