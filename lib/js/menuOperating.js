"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuOperating = menuOperating;

function showSection(menuItems, item, passiveClass, activeClass, classHidden, showSectionIndex) {
  var additionalClasses = [];

  for (var i = 0; i < item.length; i++) {
    additionalClasses[i] = item[i].classList[1];
  }

  function getCountsSorted(arr) {
    var counts = [];
    var res = [];

    for (var i in arr) {
      if (counts[arr[i]]) {
        counts[arr[i]]++;
      } else {
        counts[arr[i]] = 1;
      }
    }

    var j = 0;

    for (var i in counts) {
      res[j++] = {
        arrayItem: i,
        count: counts[i]
      };
    }

    return res;
  }

  menuItems.forEach(function (menuItem, i) {
    menuItem.classList.toggle(passiveClass, i != showSectionIndex);
    menuItem.classList.toggle(activeClass, i == showSectionIndex);
  });

  function removeAll() {
    for (var _i = 0; _i < item.length; _i++) {
      item[_i].classList.add(classHidden);
    }
  }

  function showItems(showSectionIndex) {
    removeAll();

    for (var _i2 = 0; _i2 < getCountsSorted(additionalClasses)[showSectionIndex].count; _i2++) {
      for (var _i3 = 0; _i3 < item.length; _i3++) {
        if (item[_i3].classList[1] == getCountsSorted(additionalClasses)[showSectionIndex].arrayItem) {
          item[_i3].classList.remove(classHidden);
        }
      }
    }
  }

  showItems(showSectionIndex);
}

function menuOperating(menuItems, sections, passiveClass, activeClass, classHidden) {
  menuItems.forEach(function (menuItem, i) {
    menuItem.addEventListener("click", function () {
      return showSection(menuItems, sections, passiveClass, activeClass, classHidden, i);
    });
  });
  showSection(menuItems, sections, passiveClass, activeClass, classHidden, 0);
}