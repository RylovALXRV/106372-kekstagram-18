'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var commentTextElement = bigPictureElement.querySelector('.social__footer-text');

  var bigPictureCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== commentTextElement) {
      window.util.closePopup(bigPictureElement, bigPictureCloseKeydownHandler);
    }
  };

  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

    window.comments.reset();
    window.comments.append(picture.comments);
  };

  var showBigPicture = function (picture) {
    renderBigPicture(picture);

    commentTextElement.value = '';

    window.util.openPopup(bigPictureElement, bigPictureCloseKeydownHandler);
  };

  window.preview = {
    keyDownHandler: bigPictureCloseKeydownHandler,
    showPicture: showBigPicture
  };
})();
