(function () {
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false;



const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

sections.first().addClass("active");
$(".fixed-menu__item").first().addClass("fixed-menu__item--active");


const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error('передано неверное значение в countSectionPosition');
    return 0;
  }
  return position;
}


const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme")
  const activeClass = "fixed-menu__item--active";

  sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass(activeClass).siblings().removeClass(activeClass);

  if (menuTheme === "dark") {
    sideMenu.addClass("fixed-menu--theme-dark");
  } else {
    sideMenu.removeClass("fixed-menu--theme-dark");
  }
}


const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}


const performTransition = sectionEq => {

  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertionOver = 300;

  inScroll = true;
  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClassForItem(sections, sectionEq, "active");



  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertionOver);

};


const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }
};


$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});


$(window).on("keydown", (e) => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" || tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

 
  switch (e.keyCode) {
    case 38: 
      scroller.prev();
      break;

    case 40: 
      scroller.next();
      break;
  }

});

$(".wrapper").on("touchmove", e => e.preventDefault());


$("[data-scroll-to]").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});


if (isMobile) {
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirecrion = "";

      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";

      scroller[scrollDirecrion]();
    }
  });
}
})()