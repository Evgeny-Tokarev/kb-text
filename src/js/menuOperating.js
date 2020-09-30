function showSection(
  menuItems,
  item,
  passiveClass,
  activeClass,
  classHidden,
  showSectionIndex
) {
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

  menuItems.forEach((menuItem, i) => {
    menuItem.classList.toggle(passiveClass, i != showSectionIndex);
    menuItem.classList.toggle(activeClass, i == showSectionIndex);
  });
  function removeAll() {
    for (let i = 0; i < item.length; i++) {
      item[i].classList.add(classHidden);
    }
  }

  function showItems(showSectionIndex) {
    removeAll();
    for (
      let i = 0;
      i < getCountsSorted(additionalClasses)[showSectionIndex].count;
      i++
    ) {
      for (let i = 0; i < item.length; i++) {
        if (
          item[i].classList[1] ==
          getCountsSorted(additionalClasses)[showSectionIndex].arrayItem
        ) {
          item[i].classList.remove(classHidden);
        }
      }
    }
  }
  showItems(showSectionIndex);
}

function menuOperating(
  menuItems,
  sections,
  passiveClass,
  activeClass,
  classHidden,
  n
) {
  menuItems.forEach((menuItem, i) => {
    menuItem.addEventListener("click", () =>
      showSection(
        menuItems,
        sections,
        passiveClass,
        activeClass,
        classHidden,
        i
      )
    );
  });

  showSection(menuItems, sections, passiveClass, activeClass, classHidden, n);
}

export { menuOperating };
