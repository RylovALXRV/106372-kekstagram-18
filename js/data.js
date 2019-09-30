'use strict';

(function () {

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

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateComments = function () {
    var amount = window.util.getRandomNumber(1, 2);
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
        likes: window.util.getRandomNumber(15, 200),
        name: getRandomElement(imageParams.AUTHOR_NAMES),
        url: 'photos/' + i + '.jpg'
      });
    }

    return images;
  };

  window.data = {
    images: generateImages(AMOUNT_IMAGES)
  };
})();
