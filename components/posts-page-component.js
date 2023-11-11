import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { addLike, disLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const appHtml = posts
    .map((post) => {
      function likes() {
        if (post.likes.length == 0) {
          return `0`;
        }
        if (post.likes.length == 1) {
          return `${post.likes[Object.keys(post.likes)[0]].name}`;
        }
        if (post.likes.length >= 2) {
          return `${post.likes[Object.keys(post.likes)[0]].name} и еще ${
            post.likes.length - 1
          } `;
        }
      }

      return `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" data-post-like="${
        post.isLiked
      }" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${likes()}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}:</span>
        ${post.description}
      </p>
      <p class="post-date">
      ${post.createdAt}
      </p>
    </li>`;
    })
    .join("");

  appEl.innerHTML =
    `<div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">` +
    appHtml +
    `</ul></div>`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".like-button")) {
    userEl.addEventListener("click", () => {
      if ((userEl.dataset.isLiked = false)) {
        addLike(data.id);
      }
      if ((userEl.dataset.isLiked = true)) {
        disLike(data.id);
      }
    });
  }

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
