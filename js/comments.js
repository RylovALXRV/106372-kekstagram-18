'use strict';

(function () {
  var IndexAmount = {
    END: 5,
    START: 0
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var buttonCommentsElement = bigPictureElement.querySelector('.comments-loader');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  var commentsList = [];

  var Index = function (start, end) {
    this.start = start;
    this.end = end;
  };

  Index.prototype.setMaxComments = function (amountComments, comments) {
    if (amountComments > comments.length) {
      amountComments = comments.length;
    }

    this.end = amountComments;
  };

  var index = new Index(IndexAmount.START, IndexAmount.END);

  var getCurrentComments = function (comments) {
    var commentsArr = [];

    comments.forEach(function (comment) {
      commentsArr.push(comment);
    });

    return commentsArr;
  };

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    var pictureElement = commentElement.querySelector('.social__picture');

    pictureElement.alt = comment.name;
    pictureElement.src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderComments = function (comments, startIndex, endIndex) {
    var fragment = document.createDocumentFragment();
    commentsList = getCurrentComments(comments);

    if (endIndex === commentsList.length) {
      buttonCommentsElement.classList.add('hidden');
    }

    if (endIndex > commentsList.length) {
      endIndex = commentsList.length;
    }

    for (var i = startIndex; i < endIndex; i++) {
      fragment.appendChild(renderComment(commentsList[i]));
    }

    commentsElement.appendChild(fragment);
  };

  var appendComments = function (comments) {
    commentsElement.innerHTML = '';

    renderComments(comments, IndexAmount.START, IndexAmount.END);

    // если список всех комментариев изначально меньше загружаемых - скрываем кнопку
    if (comments.length <= IndexAmount.END) {
      buttonCommentsElement.classList.add('hidden');
    }
  };

  var resetCommentsIndex = function () {
    index.end = IndexAmount.END;
    index.start = IndexAmount.START;
  };

  buttonCommentsElement.addEventListener('click', function () {
    index = new Index(index.start += IndexAmount.END, index.end += IndexAmount.END);

    index.setMaxComments(index.end, commentsList);
    renderComments(commentsList, index.start, index.end);
  });

  window.comments = {
    append: appendComments,
    reset: resetCommentsIndex
  };
})();
