'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

  window.backend.load(window.filters.render, window.modal.showError);

  bigPictureCancelElement.addEventListener('click', function () {
    window.util.closePopup(bigPictureElement, window.preview.keyDownHandler);
  });
})();
