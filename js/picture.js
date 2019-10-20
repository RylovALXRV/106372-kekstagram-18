'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (image) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var imgElement = pictureElement.querySelector('.picture__img');

    imgElement.alt = image.description;
    imgElement.src = image.url;
    pictureElement.querySelector('.picture__comments').textContent = image.comments.length;
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
