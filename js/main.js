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

  bigPictureElement.classList.remove('hidden');
};

showBigPicture(images[0]);
