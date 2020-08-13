"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prototipItems = void 0;

var _menuOperating = require("./menuOperating");

var _utils = require("./utils");

(0, _utils.qsa)(".swiper-container").forEach(function (domElement) {
  new Swiper(domElement, {
    autoHeight: true,
    //enable auto height
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
});
var menuItems = (0, _utils.qsa)(".main-menu > li");
var sections = (0, _utils.qsa)("section[data-section]");
exports.prototipItems = sections;
console.log(sections);
(0, _menuOperating.menuOperating)(menuItems, sections, "white-bg", "black-bg", "section--hidden");