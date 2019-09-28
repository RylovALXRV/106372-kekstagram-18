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

var bigPictureElement = document.querySelector('.big-picture');
var commentsElement = bigPictureElement.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

var renderComment = function (picture) {
  picture.comments.forEach(function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    var pictureElement = commentElement.querySelector('.social__picture');

    pictureElement.alt = picture.name;
    pictureElement.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
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

var showBigPicture = function (picture) {
  renderBigPicture(picture);

  // Временно закоментировал, чтобы не открывалось окно
  // bigPictureElement.classList.remove('hidden');
};

showBigPicture(images[0]);

/* ----- Личный проект: подробности ----- */

var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
var inputChecked = picturesElement.querySelector('.effects__list input:checked');
var levelElement = picturesElement.querySelector('.effect-level');
var uploadCancelElement = picturesElement.querySelector('.img-upload__cancel');

/*
*   --------
*   --------
*   --------- МАСШТАБ PREVIEW КАРТИНКИ ---------------------
* */


var Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

var Flag = {
  MINUS: -1,
  PLUS: 1
};

var scaleElement = picturesElement.querySelector('.scale');
var scaleBigger = scaleElement.querySelector('.scale__control--bigger');
var scaleInputElement = scaleElement.querySelector('.scale__control--value');
var scaleSmaller = scaleElement.querySelector('.scale__control--smaller');

var setScaleValue = function (flag) {
  var valueElement = parseFloat(scaleInputElement.value);
  var totalValue = valueElement + flag * Scale.STEP;

  if (totalValue > Scale.MAX) {
    totalValue = Scale.MAX;
  } else if (totalValue < Scale.MIN) {
    totalValue = Scale.MIN;
  }

  scaleInputElement.value = totalValue + '%';
  imgPreviewElement.style.transform = 'scale(' + (totalValue / Scale.MAX) + ')';
};

scaleSmaller.addEventListener('click', function () {
  setScaleValue(Flag.MINUS);
});

scaleBigger.addEventListener('click', function () {
  setScaleValue(Flag.PLUS);
});

/*
*   --------
*   --------
*   --------- ОТКРЫТИЕ-ЗАКРЫТИЕ POPUP ОКОН ---------------------
* */

var ESC_KEYCODE = 27;

var descriptionFieldElement = picturesElement.querySelector('.text__description');
var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
var uploadFileElement = picturesElement.querySelector('#upload-file');

var resetStylesByOpenPopup = function () {
  descriptionFieldElement.textContent = '';
  hashtagInputElement.value = '';
  imgPreviewElement.style.transform = '';
  imgPreviewElement.style.filter = '';
  imgPreviewElement.className = '';
  inputChecked = picturesElement.querySelector('.effects__list input[checked]');
  scaleInputElement.value = '100%';

  levelElement.classList.add('hidden');
};

var openPopup = function () {
  imgOverlayElement.classList.remove('hidden');

  document.addEventListener('keydown', popupCloseKeydownHandler);
};

var closePopup = function () {
  imgOverlayElement.classList.add('hidden');

  document.removeEventListener('keydown', popupCloseKeydownHandler);
};

var popupCloseKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE &&
    evt.target !== hashtagInputElement &&
    evt.target !== descriptionFieldElement) {
    closePopup();
  }
};

uploadFileElement.addEventListener('change', function () {
  resetStylesByOpenPopup();

  openPopup();
});

uploadCancelElement.addEventListener('click', function () {
  closePopup();

  uploadFileElement.value = '';
});

uploadCancelElement.addEventListener('keydown', function () {
  closePopup();

  uploadFileElement.value = '';
});


/*
* ----------
* ----------
*  --------         ПРОВЕРКА ПОЛЯ ХЭШ-ТЕГОВ       ------------
*/

var TextError = {
  HASHTAG_FIRST_CHARACTER: 'Хэш-тег начинается с символа # (решётка)',
  HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  HASHTAG_MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
  HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HASHTAGS_LENGTH: 'Нельзя указать больше пяти хэш-тегов',
  HASHTAGS_SPACE: 'Хэш-теги разделяются пробелами',
  HASHTAGS_TRUE: ''
};

var TextLength = {
  HASHTAG_MAX_LENGTH: 20,
  HASHTAGS_AMOUNT: 5,
  MIN_LENGTH: 1
};

var checkHashtags = function (target, value) {
  var hashtags = value.split(' ');
  var textError = null;

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag[0] !== '#') {
      textError = TextError.HASHTAG_FIRST_CHARACTER;
      break;
    } else if (hashtag.length === TextLength.MIN_LENGTH) {
      textError = TextError.HASHTAG_MIN_LENGTH;
      break;
    } else if (~hashtag.indexOf('#', i + TextLength.MIN_LENGTH)) {
      textError = TextError.HASHTAGS_SPACE;
      break;
    } else if (hashtags.indexOf(hashtag) !== i) {
      textError = TextError.HASHTAG_REPEAT;
      break;
    } else if (hashtags.length > TextLength.HASHTAGS_AMOUNT) {
      textError = TextError.HASHTAGS_LENGTH;
      break;
    } else if (hashtag.length > TextLength.HASHTAG_MAX_LENGTH) {
      textError = TextError.HASHTAG_MAX_LENGTH;
      break;
    } else {
      textError = TextError.HASHTAGS_TRUE;
    }
  }

  target.setCustomValidity(textError);
};

hashtagInputElement.addEventListener('input', function (evt) {
  var hashtagValue = hashtagInputElement.value.trim().toLowerCase();
  var target = evt.target;

  checkHashtags(target, hashtagValue);
});

/*
* ----------
* ----------
*  --------         ФИЛЬТР ДЛЯ ПОЛЕЙ       ------------
*/
var EffectParameter = {
  chrome: {
    CLASS: 'effects__preview--chrome',
    PROPERTY: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  heat: {
    CLASS: 'effects__preview--heat',
    PROPERTY: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    UNIT: ''
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    PROPERTY: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    UNIT: '%'
  },
  none: {
    CLASS: 'effects__preview--none',
    PROPERTY: ''
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    PROPERTY: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    UNIT: 'px'
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    PROPERTY: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  }
};

var PERCENT_MAX = 100;

var levelInputElement = levelElement.querySelector('.effect-level__value');
var lineElement = picturesElement.querySelector('.effect-level__line');
var depthElement = lineElement.querySelector('.effect-level__depth');
var pinElement = lineElement.querySelector('.effect-level__pin');

var filterValue = null;

// Получаю центральную координату элемента с учетом смещения при нажатии
var getPinCenterCoord = function (element, coord) {
  var coordsElement = element.getBoundingClientRect();
  var centerElement = coordsElement.right - (coordsElement.width / 2);
  var shiftX = centerElement - coord;

  return Math.round(coord + shiftX);
};

// Получаю значение пина для фильтра относительно ширины шкалы
var getEffectValue = function (coord) {
  var coordsScale = lineElement.getBoundingClientRect();
  var pinLocation = coord - coordsScale.left;

  return Math.round(pinLocation * PERCENT_MAX / coordsScale.width);
};

var getEffectHtml = function (evt, name) {
  var pinCenterCoord = getPinCenterCoord(pinElement, evt.clientX);
  filterValue = getEffectValue(pinCenterCoord);

  return EffectParameter[name].PROPERTY !== 'none' ?
    EffectParameter[name].PROPERTY + '(' +
    (filterValue * (EffectParameter[name].MAX_VALUE - EffectParameter[name].MIN_VALUE) / PERCENT_MAX
    + EffectParameter[name].MIN_VALUE) + EffectParameter[name].UNIT + ')' :
    '';
};

var setEffect = function (evt, effect, effectName) {
  imgPreviewElement.style.filter = getEffectHtml(evt, effect, effectName);
  levelInputElement.value = filterValue;

  filterValue = null;
};

var showElement = function (target, element) {
  if (target.value === 'none') {
    element.classList.add('hidden');
    return;
  }

  element.classList.remove('hidden');
};

var pinClickHandler = function (evt) {
  setEffect(evt, inputChecked.value);
};

var setOriginalPreviewEffect = function (value) {
  var effectPreview = (value !== 'none') ?
    EffectParameter[value].PROPERTY + '(' + EffectParameter[value].MAX_VALUE
    + EffectParameter[value].UNIT + ')' :
    '';

  imgPreviewElement.classList.add('effects__preview--' + value);
  imgPreviewElement.style.filter = effectPreview;
  depthElement.style.width = '100%';
  pinElement.style.left = '100%';
};

var sampleFilterClickHandler = function (evt) {
  var target = evt.target;

  if (target.tagName !== 'INPUT' || target === inputChecked) {
    return;
  }

  showElement(target, levelElement);

  imgPreviewElement.className = '';
  inputChecked = target;

  setOriginalPreviewEffect(inputChecked.value);

  levelInputElement.value = '';
};

picturesElement.querySelector('.effects__list').addEventListener('click', sampleFilterClickHandler);
pinElement.addEventListener('mouseup', pinClickHandler);
