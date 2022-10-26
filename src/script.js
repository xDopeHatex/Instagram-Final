const navlink = document.querySelector(".navlink");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", function () {
  const header = document.querySelector(".navlink");

  header.classList.toggle("sticky", window.scrollY > 0);
});

// Opacity Animation

const opacityText = document.querySelectorAll(".opacity-text");

const observerForOpacity = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show-opacity", entry.isIntersecting);
      if (entry.isIntersecting) observerForOpacity.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
  }
);

opacityText.forEach((el) => {
  observerForOpacity.observe(el);
});

//  Translate From Right Animation

const translateTextFromRight = document.querySelectorAll(
  ".translate-text-from-right"
);

const observerForTranslateFromRight = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show-translate", entry.isIntersecting);
      if (entry.isIntersecting)
        observerForTranslateFromRight.unobserve(entry.target);
    });
  },
  {
    threshold: 0.1,
  }
);

translateTextFromRight.forEach((el) => {
  observerForTranslateFromRight.observe(el);
});

// Translate From Left Animation

const translateTextFromLeft = document.querySelectorAll(
  ".translate-text-from-left"
);

const observerForTranslateFromLeft = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show-translate", entry.isIntersecting);
      if (entry.isIntersecting)
        observerForTranslateFromLeft.unobserve(entry.target);
    });
  },
  {
    threshold: 0.1,
  }
);

translateTextFromLeft.forEach((el) => {
  observerForTranslateFromLeft.observe(el);
});

// Handlers

const overlay = document.querySelector(".overlay");

// Add Menu Handlers
const addForm = document.querySelector("#add-form");
const addModalWindow = document.querySelector(".add-modal-window");
const addPostButton = document.querySelector(".add-post-button");

const addButtonClose = document.querySelector(".add-button-close");
const addTitleContent = document.querySelector(".add-title-content");
const addTitleCharacters = document.querySelector(".add-title-characters");
const addPostContent = document.querySelector(".add-post-content");
const addPostCharacters = document.querySelector(".add-post-characters");
const addUploadPost = document.querySelector(".add-upload-post");

// Add Menu Actions

console.log(addButtonClose);
const closeAddModal = function () {
  addModalWindow.classList.remove("active");
  overlay.classList.remove("active");
  addModalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
  console.log("YEEEAH");
};
addButtonClose.addEventListener("click", closeAddModal);

addPostButton.addEventListener("click", () => {
  addModalWindow.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  addModalWindow.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeAddModal);

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" && addModalWindow.classList.contains("active")) ||
    (e.key === "Escape" && editModalWindow.classList.contains("active"))
  ) {
    closeAddModal();
    closeEditModal();
  }
});

// .hidden {
//   display: none;
// }
