'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var commentText = bigPictureElement.querySelector('.social__footer-text');
  var picturesElement = document.querySelector('.pictures');

  var bigPictureCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== commentText) {
      window.util.closePopup(bigPictureElement, bigPictureCloseKeydownHandler);
    }
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(window.picture.render(picture));
    });

    picturesElement.appendChild(fragment);
  };

  var showBigPicture = function (image) {
    window.preview.render(image);

    window.util.openPopup(bigPictureElement, bigPictureCloseKeydownHandler);
  };

  var pictureClickHandler = function (picture, image) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();

      commentText.value = '';

      showBigPicture(image);
    });
  };

  renderPictures(window.data.images);

  /*
  * Ты писала:
  * А почему сразу не написать здесь код, который у тебя в функции pictureClickHandler?
  *  Зачем эта функция вообще нужна? Тем более, что объявлена она ста строчками ранее, ооочень неудобно.
  * и я забыл спросить, что также работать не будет без ф-ии, здесь же типо через замыкание только и будет работать...
  * */

  for (var i = 0; i < picturesElement.querySelectorAll('.picture').length; i++) {
    var pictureElement = picturesElement.querySelectorAll('.picture')[i];

    pictureClickHandler(pictureElement, window.data.images[i]);
  }

  bigPictureCancelElement.addEventListener('click', function () {
    window.util.closePopup(bigPictureElement, bigPictureCloseKeydownHandler);
  });

  bigPictureCancelElement.addEventListener('keydown', function () {
    window.util.closePopup(bigPictureElement, bigPictureCloseKeydownHandler);
  });
})();
