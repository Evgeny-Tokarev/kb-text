 let prototipMenuItems = document.querySelectorAll(".main-menu>li");
      let prototipItems = document.querySelectorAll(".swiper-container");
 
      import { menuOperating } from "./menuOperating.js";

      menuOperating(prototipMenuItems, prototipItems, "white-bg", "black-bg", "swiper-shown");
      export  {prototipItems};