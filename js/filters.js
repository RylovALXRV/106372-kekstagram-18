'use strict';

(function () {

  var Filter = {
    'filter-popular': function () {
      return currentPictures;
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
  var buttonActive = filtersElement.querySelector('.img-filters__button--active');
  var picturesElement = document.querySelector('.pictures');

  var currentPictures = [];

  var sortByDiscussed = function (pictureA, pictureB) {
    var rankDiff = pictureB.comments.length - pictureA.comments.length;

    if (rankDiff === 0) {
      rankDiff = pictureB.likes - pictureA.likes;
    }

    return rankDiff;
  };

  var sortByRandom = function () {
    return Math.random() - 0.5;
  };

  var getPictures = function (target, pictures) {
    return Filter[target.id](pictures);
  };

  var removePictures = function () {
    var pictureElements = picturesElement.querySelectorAll('.picture');

    for (var i = 0; i < pictureElements.length; i++) {
      pictureElements[i].remove();
    }
  };

  var renderPictures = window.debounce(function (images) {
    var fragment = document.createDocumentFragment();

    removePictures();

    images.forEach(function (image) {
      fragment.appendChild(window.picture.render(image));
    });

    picturesElement.appendChild(fragment);
  });

  var renderCurrentPictures = function (images) {
    var fragment = document.createDocumentFragment();
    currentPictures = images;

    filtersElement.addEventListener('click', function (evt) {
      var target = evt.target;
      var pictures = getPictures(target, currentPictures);

      buttonActive.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      renderPictures(pictures);

      buttonActive = target;
    });

    images.forEach(function (image) {
      fragment.appendChild(window.picture.render(image));
    });

    picturesElement.appendChild(fragment);
    filtersElement.classList.remove('img-filters--inactive');
  };

  window.filters = {
    render: renderCurrentPictures
  };
})();
