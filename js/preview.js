'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  var renderComment = function (picture) {
    picture.comments.forEach(function (comment) {
      var commentElement = commentTemplate.cloneNode(true);
      var pictureElement = commentElement.querySelector('.social__picture');

      pictureElement.alt = picture.name;
      pictureElement.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      commentElement.querySelector('.social__text').textContent = comment;

      commentsElement.appendChild(commentElement);
    });
  };

  var appendComments = function (picture) {
    while (commentsElement.firstChild) {
      commentsElement.firstChild.remove();
    }

    renderComment(picture);
  };

  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

    appendComments(picture);
  };

  window.preview = {
    render: renderBigPicture
  };
})();
