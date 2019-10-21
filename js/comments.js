'use strict';

(function () {

  var IndexNumber = {
    END: 5,
    START: 0
  };

  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var bigPictureElement = document.querySelector('.big-picture');
  var buttonCommentsElement = bigPictureElement.querySelector('.comments-loader');
  var commentsElement = bigPictureElement.querySelector('.social__comments');

  var currentComments = [];

  var Index = function (start, end) {
    this.start = start;
    this.end = end;
  };

  Index.prototype.setCommentLastIndex = function (lastIndex) {
    if (lastIndex > currentComments.length) {
      lastIndex = currentComments.length;
    }

    this.end = lastIndex;
  };

  var index = new Index(IndexNumber.START, IndexNumber.END);

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    var pictureElement = commentElement.querySelector('.social__picture');

    commentElement.querySelector('.social__text').textContent = comment.message;
    pictureElement.alt = comment.name;
    pictureElement.src = comment.avatar;

    return commentElement;
  };

  var renderComments = function (comments, indexStart, indexEnd) {
    var fragment = document.createDocumentFragment();
    currentComments = comments;

    if (indexEnd === currentComments.length) {
      buttonCommentsElement.classList.add('hidden');
    }

    if (indexEnd > currentComments.length) {
      indexEnd = currentComments.length;
    }

    for (var i = indexStart; i < indexEnd; i++) {
      fragment.appendChild(renderComment(currentComments[i]));
    }

    commentsElement.appendChild(fragment);
  };

  var appendComments = function (comments) {
    commentsElement.innerHTML = '';

    renderComments(comments, IndexNumber.START, IndexNumber.END);

    // если список всех комментариев изначально меньше загружаемых - скрываем кнопку
    if (comments.length <= IndexNumber.END) {
      buttonCommentsElement.classList.add('hidden');
    }
  };

  var resetCommentsIndex = function () {
    index.end = IndexNumber.END;
    index.start = IndexNumber.START;
  };

  buttonCommentsElement.addEventListener('click', function () {
    index = new Index(index.start += IndexNumber.END, index.end += IndexNumber.END);

    index.setCommentLastIndex(index.end);
    renderComments(currentComments, index.start, index.end);
  });

  window.comments = {
    append: appendComments,
    reset: resetCommentsIndex
  };
})();
