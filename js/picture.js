'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };

  window.picture = {
    render: renderPicture
  };
})();
