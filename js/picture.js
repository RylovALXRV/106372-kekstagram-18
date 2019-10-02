'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (image) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__comments').textContent = image.comments.length;
    pictureElement.querySelector('.picture__img').alt = image.description;
    pictureElement.querySelector('.picture__img').src = image.url;
    pictureElement.querySelector('.picture__likes').textContent = image.likes;

    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.preview.showPicture(image);
    });

    return pictureElement;
  };

  window.picture = {
    render: renderPicture
  };
})();
