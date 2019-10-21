'use strict';

(function () {

  var Filter = {
    'filter-popular': function (pictures) {
      return pictures;
    },
    'filter-random': function (pictures) {
      var picturesSort = pictures.slice().sort(sortByRandom);

      return picturesSort.slice(0, 10);
    },
    'filter-discussed': function (pictures) {
      return pictures.slice().sort(sortByDiscussed);
    }
  };

  var filtersElement = document.querySelector('.img-filters');
  var buttonActiveElement = filtersElement.querySelector('.img-filters__button--active');
  var picturesElement = document.querySelector('.pictures');

  var picture = null;
  var pictureElements = null;
  var pictureCards = [];

  var Picture = function (card, comments, likes) {
    this.card = card;
    this.comments = comments;
    this.likes = likes;
  };

  Picture.prototype.getPictures = function (target, cards) {
    return Filter[target.id](cards);
  };

  var sortByDiscussed = function (pictureA, pictureB) {
    var rankDiff = pictureB.comments - pictureA.comments;

    if (rankDiff === 0) {
      rankDiff = pictureB.likes - pictureA.likes;
    }

    return rankDiff;
  };

  var sortByRandom = function () {
    return Math.random() - 0.5;
  };

  var removePictures = function () {
    var pictureCardElements = picturesElement.querySelectorAll('.picture');

    pictureCardElements.forEach(function (pictureCard) {
      pictureCard.remove();
    });
  };

  var showPictures = window.debounce(function (images) {
    var fragment = document.createDocumentFragment();

    removePictures();

    images.forEach(function (image) {
      fragment.appendChild(image.card);
    });

    picturesElement.appendChild(fragment);
  });

  var createPicture = function (nodeElement) {
    picture = new Picture(nodeElement,
        parseFloat(nodeElement.querySelector('.picture__comments').textContent),
        parseFloat(nodeElement.querySelector('.picture__likes').textContent));
    return picture;
  };

  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    if (!pictureElements) {
      pictureElements = picturesElement.querySelectorAll('.picture');

      for (var i = 0; i < pictureElements.length; i++) {
        pictureCards.push(createPicture(pictureElements[i]));
      }
    }

    buttonActiveElement.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    showPictures(picture.getPictures(target, pictureCards));

    buttonActiveElement = target;
  });
})();
