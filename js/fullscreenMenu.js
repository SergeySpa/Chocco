const hamburger = document.querySelector("#hamburger");
const fullscreenMenu = document.querySelector(".fullscreen-menu");
const close = document.querySelector(".fullscreen-menu__close")

hamburger.addEventListener("click", e => {
  e.preventDefault();

  fullscreenMenu.classList.add("active");
})

close.addEventListener("click", e => {
  e.preventDefault();

  fullscreenMenu.classList.remove("active");
})