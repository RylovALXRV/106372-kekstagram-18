'use strict';

(function () {

  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25
  };

  var Flag = {
    MINUS: -1,
    PLUS: 1
  };

  var picturesElement = document.querySelector('.pictures');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var scaleElement = picturesElement.querySelector('.scale');
  var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
  var scaleInputElement = scaleElement.querySelector('.scale__control--value');
  var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');

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

  scaleSmallerElement.addEventListener('click', function () {
    setScaleValue(Flag.MINUS);
  });

  scaleBiggerElement.addEventListener('click', function () {
    setScaleValue(Flag.PLUS);
  });
})();
