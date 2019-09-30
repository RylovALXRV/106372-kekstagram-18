'use strict';

(function () {
  var hashtagInputElement = document.querySelector('.pictures .text__hashtags');

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
})();
