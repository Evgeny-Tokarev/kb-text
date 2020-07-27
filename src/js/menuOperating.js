function showSection(
  menuItems,
  sections,
  passiveClass,
  activeClass,
  classHidden,
  showSectionIndex
) {
  menuItems.forEach((menuItem, i) => {
    menuItem.classList.toggle(passiveClass, i != showSectionIndex);
    menuItem.classList.toggle(activeClass, i == showSectionIndex);
  });
  sections.forEach((section, i) => {
    section.classList.toggle(classHidden, i != showSectionIndex);
  });
}

function menuOperating(
  menuItems,
  sections,
  passiveClass,
  activeClass,
  classHidden
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

  showSection(menuItems, sections, passiveClass, activeClass, classHidden, 0);
}

export { menuOperating };
