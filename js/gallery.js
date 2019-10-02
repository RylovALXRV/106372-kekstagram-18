'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var picturesElement = document.querySelector('.pictures');

  var renderPictures = function (images) {
    var fragment = document.createDocumentFragment();

    images.forEach(function (image) {
      fragment.appendChild(window.picture.render(image));
    });

    picturesElement.appendChild(fragment);
  };

  renderPictures(window.data.images);

  bigPictureCancelElement.addEventListener('click', function () {
    window.util.closePopup(bigPictureElement, window.preview.keyDownHandler);
  });
})();
