function menuOperating(menu, item, passiveClass, activeClass, showClass) {
  let additionalClasses = [];

  for (let i = 0; i < item.length; i++) {
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
        count: counts[i],
      };
    }
    return res;
  }

  for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", () => showItems(i));
  }
  function removeAll() {
    for (let i = 0; i < menu.length; i++) {
      menu[i].classList.remove(activeClass);
      menu[i].classList.add(passiveClass);
    }
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove(showClass);
    }
  }

  function showItems(n) {
    removeAll();
    for (let i = 0; i < menu.length; i++) {
      
      menu[n].classList.remove(passiveClass);
      menu[n].classList.add(activeClass);
    }
    for (let i = 0; i < getCountsSorted(additionalClasses)[n].count; i++) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].classList[1] == getCountsSorted(additionalClasses)[n].arrayItem) {
          item[i].classList.add(showClass);
        }
      }
    }
  }
  showItems(0);
}
export {menuOperating};