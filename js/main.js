'use strict';

/* ----- Личный проект: пока все дома ----- */

var AMOUNT_IMAGES = 25;
var imageParams = {
  AUTHOR_NAMES: ['Павел', 'Виктория', 'Владимир', 'Анастасия', 'Андрей', 'Светлана'],
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  DESCRIPTIONS: ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.',
    'Не обижайте всех словами......', 'Вот это тачка!']
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateComments = function () {
  var amount = getRandomNumber(1, 2);
  var comment = getRandomElement(imageParams.COMMENTS);
  var comments = [];

  while (comments.length !== amount) {
    if (~comments.indexOf(comment)) {
      comment = getRandomElement(imageParams.COMMENTS);
      continue;
    }
    comments.push(comment);
  }

  return comments;
};

var generateImages = function (amount) {
  var images = [];

  for (var i = 1; i <= amount; i++) {
    images.push({
      comments: generateComments(),
      description: getRandomElement(imageParams.DESCRIPTIONS),
      likes: getRandomNumber(15, 200),
      name: getRandomElement(imageParams.AUTHOR_NAMES),
      url: 'photos/' + i + '.jpg'
    });
  }

  return images;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (picture) {
    fragment.appendChild(renderPicture(picture));
  });

  picturesElement.appendChild(fragment);
};

var images = generateImages(AMOUNT_IMAGES);

renderPictures(images);

/* ----- Личный проект: больше деталей ----- */

// var bigPictureElement = document.querySelector('.big-picture');
// var commentsElement = bigPictureElement.querySelector('.social__comments');
// var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
//
// var renderComment = function (picture) {
//   picture.comments.forEach(function (comment) {
//     var commentElement = commentTemplate.cloneNode(true);
//     var pictureElement = commentElement.querySelector('.social__picture');
//
//     pictureElement.alt = picture.name;
//     pictureElement.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
//     commentElement.querySelector('.social__text').textContent = comment;
//
//     commentsElement.appendChild(commentElement);
//   });
// };

// var appendComments = function (picture) {
//   while (commentsElement.firstChild) {
//     commentsElement.firstChild.remove();
//   }
//
//   renderComment(picture);
// };

// var renderBigPicture = function (picture) {
//   bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
//   bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
//   bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
//   bigPictureElement.querySelector('.social__caption').textContent = picture.description;
//
//   bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
//   bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
//
//   appendComments(picture);
// };

// var showBigPicture = function (picture) {
//   renderBigPicture(picture);
//
//   bigPictureElement.classList.remove('hidden');
// };

// showBigPicture(images[0]);

/* ----- Личный проект: подробности ----- */

var ESC_KEYCODE = 27;
var STEP = 25;

var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
var descriptionFieldElement = picturesElement.querySelector('.text__description');
var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
var inputChecked = picturesElement.querySelector('.effects__list input:checked');
var levelElement = picturesElement.querySelector('.effect-level');
var levelInputElement = levelElement.querySelector('.effect-level__value');
var lineElement = picturesElement.querySelector('.effect-level__line');
var pinElement = lineElement.querySelector('.effect-level__pin');
var scaleElement = picturesElement.querySelector('.scale');
var scaleInputElement = scaleElement.querySelector('.scale__control--value');
var uploadCancelElement = picturesElement.querySelector('.img-upload__cancel');
var uploadFileElement = picturesElement.querySelector('#upload-file');

// Получаю центральную координату элемента с учетом смещения при нажатии
var getCenterElement = function (element, elementClientX) {
  var coordsElement = element.getBoundingClientRect();
  var centerElement = coordsElement.right - (coordsElement.width / 2);
  var shiftX = centerElement - elementClientX;

  return Math.round(elementClientX + shiftX);
};

// Получаю процентное отношение пина относительно ширины шкалы
var getRatio = function (scale, pin) {
  var coordsScale = scale.getBoundingClientRect();
  var pinLocation = pin - coordsScale.left;

  return Math.round(pinLocation * 100 / coordsScale.width);
};

// Получаю значение для фильтра, исходя из полученного расположения пина
var getValueForFilter = function (max, ratio) {
  return parseFloat((max * ratio / 100).toFixed(2));
};

var getEffectLevel = function (max, value) {
  return value * 100 / max;
};

var setFilter = function (fieldValue, filter) {
  var effectLevel = null;
  var filterHtml = null;

  switch (fieldValue) {
    case 'chrome':
      effectLevel = getEffectLevel(1, filter.grayscaleValue);
      filterHtml = 'grayscale(' + filter.grayscaleValue + ')';
      break;
    case 'heat':
      effectLevel = getEffectLevel(2, filter.brightnessValue);
      filterHtml = 'brightness(' + (filter.brightnessValue + 1) + ')';
      break;
    case 'marvin':
      effectLevel = filter.invertValue;
      filterHtml = 'invert(' + filter.invertValue + '%)';
      break;
    case 'none':
      effectLevel = '';
      filterHtml = '';
      break;
    case 'phobos':
      effectLevel = getEffectLevel(3, filter.blurValue);
      filterHtml = 'blur(' + filter.blurValue + 'px)';
      break;
    case 'sepia':
      effectLevel = getEffectLevel(1, filter.sepiaValue);
      filterHtml = 'sepia(' + filter.sepiaValue + ')';
      break;
  }

  imgPreviewElement.style.filter = filterHtml;
  levelInputElement.value = effectLevel;
};

var resetStylesFilter = function () {
  imgPreviewElement.style.filter = '';
  imgPreviewElement.style.transform = '';
  uploadFileElement.value = '';
};

var setDefaultValues = function () {
  inputChecked = picturesElement.querySelector('.effects__list input[checked]');
  scaleInputElement.value = '100%';
};

var openPopup = function () {
  imgOverlayElement.classList.remove('hidden');
  setDefaultValues();

  document.addEventListener('keydown', popupCloseKeydownHandler);
};

var closePopup = function () {
  imgOverlayElement.classList.add('hidden');
  resetStylesFilter();

  document.removeEventListener('keydown', popupCloseKeydownHandler);
};

var popupCloseKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE &&
    evt.target !== hashtagInputElement &&
    evt.target !== descriptionFieldElement) {
    closePopup();
  }
};

setDefaultValues();

uploadFileElement.addEventListener('change', function () {
  openPopup();
});

uploadCancelElement.addEventListener('click', function () {
  closePopup();
});

uploadCancelElement.addEventListener('keydown', function () {
  closePopup();
});

pinElement.addEventListener('mouseup', function (evt) {
  var centerPinElement = getCenterElement(pinElement, evt.clientX);
  var coeffPinElement = getRatio(lineElement, centerPinElement);

  var filters = {
    blurValue: getValueForFilter(3, coeffPinElement),
    brightnessValue: getValueForFilter(2, coeffPinElement),
    grayscaleValue: getValueForFilter(1, coeffPinElement),
    invertValue: getValueForFilter(100, coeffPinElement),
    sepiaValue: getValueForFilter(1, coeffPinElement)
  };

  setFilter(inputChecked.value, filters);
});

picturesElement.querySelector('.effects__list').addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.value === 'none') {
    levelElement.classList.add('hidden');
  } else {
    levelElement.classList.remove('hidden');
  }

  if (target.tagName !== 'INPUT' || target === inputChecked) {
    return;
  }

  imgPreviewElement.className = '';
  inputChecked = target;

  imgPreviewElement.classList.add('effects__preview--' + inputChecked.value);
  imgPreviewElement.style.filter = '';
  levelInputElement.value = '';
});

var changeScaleValue = function (target) {
  var value = parseFloat(scaleInputElement.value);
  var totalValue = target.classList.contains('scale__control--smaller') ? value - STEP : value + STEP;

  if (totalValue > 100) {
    totalValue = 100;
  } else if (totalValue < 25) {
    totalValue = 25;
  }

  return totalValue;
};

scaleElement.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.tagName !== 'BUTTON') {
    return;
  }

  var scaleValue = changeScaleValue(evt.target);

  scaleInputElement.value = scaleValue + '%';
  imgPreviewElement.style.transform = 'scale(' + (scaleValue / 100) + ')';
});

var checkHashtags = function (target, hashtagElement) {
  var hashtags = hashtagElement.split(' ');

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag[0] !== '#') {
      target.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      return false;
    } else if (hashtag.length === 1) {
      target.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (~hashtag.indexOf('#', i + 1)) {
      target.setCustomValidity('хэш-теги разделяются пробелами');
      return false;
    } else if (hashtags.indexOf(hashtag) !== i) {
      target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      return false;
    } else if (hashtags.length > 5) {
      target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return false;
    } else if (hashtag.length > 20) {
      target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    } else {
      target.setCustomValidity('');
    }
  }

  return true;
};

hashtagInputElement.addEventListener('input', function (evt) {
  var hashtagLower = hashtagInputElement.value.toLowerCase();
  var target = evt.target;

  checkHashtags(target, hashtagLower);
});
