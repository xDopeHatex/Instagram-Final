const navlink = document.querySelector(".navlink");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", function () {
  const header = document.querySelector(".navlink");

  header.classList.toggle("sticky", window.scrollY > 0);
});
