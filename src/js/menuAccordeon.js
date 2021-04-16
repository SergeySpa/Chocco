(function () {
const isPhones = window.matchMedia('(max-width: 480px)').matches;
const isTablets = window.matchMedia('(max-width: 840px)').matches;


const mesureWidth = item => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titleWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".products-menu__content-text");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

 
  if (isPhones) {
    reqItemWidth = screenWidth - titlesBlocks.width();
  } else if (isTablets) {
    reqItemWidth = screenWidth - titleWidth;
  } else {
    reqItemWidth = 524;
  }

  
  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  }

};


const closeEveryItemInContainer = container => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");
  content.width(0);
}


const openThisItem = (item) => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products-menu__content-text");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}


$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products-menu"); 

  
  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container); 
    openThisItem(item); 
  }

  
  if (isPhones) {
    if (item.hasClass("active-mobile")) {
      item.removeClass("active-mobile");
    } else {
      item.addClass("active-mobile");
    }
  }
});
})()