'use strict';

(function () {
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

  var PinValue = {
    MAX: 100,
    MIN: 0
  };

  var PERCENT_MAX = 100;

  var picturesElement = document.querySelector('.pictures');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var lineElement = picturesElement.querySelector('.effect-level__line');
  var depthElement = lineElement.querySelector('.effect-level__depth');
  var pinElement = lineElement.querySelector('.effect-level__pin');
  var levelElement = picturesElement.querySelector('.effect-level');
  var levelInputElement = levelElement.querySelector('.effect-level__value');

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

  var setEffect = function (evt, effect) {
    imgPreviewElement.style.filter = getEffectHtml(evt, effect.value);
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
    if (target.tagName !== 'INPUT' || target === window.form.inputField) {
      return;
    }

    showElement(target, levelElement);

    imgPreviewElement.className = '';
    window.form.inputField = target;

    setOriginalPreviewEffect(window.form.inputField.value);

    levelInputElement.value = '';
  };

  var getCoordResult = function (shift) {
    var coord = (pinElement.offsetLeft - shift) * PinValue.MAX / lineElement.offsetWidth;

    if (coord <= PinValue.MIN) {
      coord = PinValue.MIN;
    } else if (coord >= PinValue.MAX) {
      coord = PinValue.MAX;
    }

    return coord;
  };

  var setPinPosition = function (coord) {
    pinElement.style.left = coord + '%';
    depthElement.style.width = coord + '%';
  };

  lineElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    var pinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      var coordResult = getCoordResult(shift);

      setPinPosition(coordResult);
      setEffect(moveEvt, window.form.inputField);
    };

    var pinMouseupHandler = function () {
      document.removeEventListener('mousemove', pinMousemoveHandler);
      document.removeEventListener('mouseup', pinMouseupHandler);
    };

    document.addEventListener('mousemove', pinMousemoveHandler);
    document.addEventListener('mouseup', pinMouseupHandler);
  });

  picturesElement.querySelector('.effects__list').addEventListener('click', sampleFilterClickHandler);
})();
