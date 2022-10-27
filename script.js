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

// Delete Menu Handlers

const deleteModalWindow = document.querySelector(".delete-modal-window");
const deleteButtonClose = document.querySelector(".delete-button-close");
const deletePostBtn = document.querySelector(".delete-post-btn");
const deleteForm = document.querySelector("#delete-form");

console.log(deletePostBtn);

//Other Handkers
const postList = document.querySelector(".post-list");

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

// Delete Menu Actions

const closeDeleteModal = function () {
  deleteModalWindow.classList.remove("active");
  overlay.classList.remove("active");
  deleteModalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

deleteButtonClose.addEventListener("click", closeDeleteModal);

overlay.addEventListener("click", closeDeleteModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && deleteModalWindow.classList.contains("active")) {
    closeDeleteModal();
  }
});

// Actions
addForm.addEventListener("submit", addPostToServer);

downloadPosts();

async function addPostToServer(e) {
  try {
    if (addPostContent.value === "") {
      alert("It seems that you forgot to add a post, bro");
    } else {
      e.preventDefault();

      const formData = new FormData(addForm);

      console.log([...formData]);

      console.log(formData);
      const x = await axios.post(
        "https://pocketbase.sksoldev.com/api/collections/instagram/records",
        formData
      );

      console.log(x);

      addPostContent.value = "";

      postList.innerHTML = "";

      downloadPosts();
      closeAddModal();
    }
  } catch (error) {
    console.log(error);
  }
}

async function downloadPosts() {
  try {
    // loader.classList.add("flex");
    // loader.classList.remove("hidden");
    const result = await axios.get(
      "https://pocketbase.sksoldev.com/api/collections/instagram/records?sort=-created"
    );

    result.data.items.forEach((element) => {
      template(element);
    });

    document.querySelectorAll(".delete-button").forEach((el) =>
      el.addEventListener("click", () => {
        deleteModalWindow.classList.toggle("hidden");
        overlay.classList.toggle("hidden");
        deleteModalWindow.classList.toggle("active");
        overlay.classList.toggle("active");

        deleteForm.dataset.id = `${el.dataset.id}`;
      })
    );

    // document.querySelectorAll(".clickimg").forEach((el) =>
    //   el.addEventListener("click", (el) => {
    //     const x = el.path[1];
    //     console.log("eee");
    //     x.classList.toggle("scale-150");
    //     x.classList.toggle("max-w-[50%]");
    //   })
    // );

    // document
    //   .querySelectorAll(".like-button")
    //   .forEach((el) => el.addEventListener("click", likePost));

    // const editPost = document.querySelectorAll(".edit-button");

    // editPost.forEach((el) =>
    //   el.addEventListener("click", () => {
    //     console.log(el.dataset.id);
    //     // console.log(el.dataset.title);
    //     // console.log(el.dataset.body);
    //     // console.log(el.dataset.likes);

    //     const postList = document.querySelector(".post-list");

    //     const currentPost = postList.querySelector(`#${el.dataset.id}`);

    //     editTitleContent.textContent =
    //       currentPost.querySelector(".title").textContent;
    //     console.log(editTitleContent.value);
    //     editPostContent.textContent =
    //       currentPost.querySelector(".body").textContent;

    //     editForm.dataset.id = `${el.dataset.id}`;
    //     // console.log(editPostContent.value);
    //     // editTitleContent.value = el.dataset.title;
    //     // editPostContent.value = el.dataset.body;
    //     // console.log(editPostContent.value);

    //     editModalWindow.classList.toggle("active");
    //     overlay.classList.toggle("hidden");
    //   })
    // );

    // editForm.addEventListener("submit", editPostToServer);

    // uploadPages();
    // loader.classList.add("hidden");
    // loader.classList.remove("flex");
  } catch (error) {
    console.log(error);
  }
}

function template(item) {
  console.log(item);
  const data = new Date(item.created);

  const currentTime = data.toLocaleDateString("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const li = document.createElement("li");
  // Add class
  li.className = `group `;

  //Add id

  li.setAttribute("id", `${item.id}`);

  li.innerHTML = `<figure>
  <div class="top flex justify-between z-10">
    <div
      class="text-white bg-black items-start backdrop-blur-sm px-7 py-2 h-10 rounded-lg transition-all duration-500 scale-0 group-hover:scale-100"
    >
    ${currentTime}
    </div>
    <div class="items-start space-x-3">
      <button
        data-id="${item.id}"
        data-title="${item.title}"
        data-body="${item.body}"
        data-likes="${item.likes}"
        class="edit-button backdrop-blur-sm px-7 py-2 border-2 border-white rounded-lg text-white hover:bg-black active:bg-black transition-all duration-500 active:translate-y-0.5 scale-0 group-hover:scale-100"
      >
        Edit
      </button>
      <button data-id="${item.id}"  
        class="delete-button px-4 py-2 backdrop-blur-sm border-white border-2 text-white rounded-lg transition-all hover:bg-black active:bg-black duration-500 active:translate-y-0.5 scale-0 group-hover:scale-100"
      >
        Delete
      </button>
    </div>
  </div>
  <img class="img" src="${
    item.image
      ? `https://pocketbase.sksoldev.com/api/files/instagram/${item.id}/${item.image}`
      : ""
  }" alt="" />
  <figcaption class="flex flex-col justify-center space-y-5">
    <div class="flex justify-between items-center">
      
      <div class="flex justify-between items-center div-likes">
        <button class="relative like-button">
          <p class="likes ml-8 text-white">${item.likes}</p>
          <div
            class="h-6 w-6 absolute -top-0 -left-0 hover:scale-125 rounded-2xl transition-all active:translate-y-1 duration-300"
          >
            <img src="../img/like.svg" style="fill: white" alt="" />
          </div>
        </button>
      </div>
    </div>
    <p class="text-white body overflow-auto">
    ${item.text}
    </p>
  </figcaption>
  </figure>`;

  postList.appendChild(li);
}

deletePostBtn.addEventListener("click", deletePost);

console.log(deleteForm.dataset.id);

async function deletePost(e) {
  try {
    await axios.delete(
      `https://pocketbase.sksoldev.com/api/collections/instagram/records/${deleteForm.dataset.id}`
    );
    postList.innerHTML = "";
    await downloadPosts();
    // postList.querySelector(`#${deleteForm.dataset.id}`).remove();

    closeDeleteModal();
  } catch (error) {
    console.log(error);
  }
}
