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
      PROPERTY: '',
      MIN_VALUE: 0,
      MAX_VALUE: 0,
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

  var DEFAULT_EFFECT = 'none';
  var PERCENT_MAX = 100;

  var picturesElement = document.querySelector('.pictures');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var lineElement = picturesElement.querySelector('.effect-level__line');
  var depthElement = lineElement.querySelector('.effect-level__depth');
  var pinElement = lineElement.querySelector('.effect-level__pin');
  var levelElement = picturesElement.querySelector('.effect-level');
  var levelInputElement = levelElement.querySelector('.effect-level__value');

  var effectValue = null;
  var pinCoord = null;

  // Получаю значение пина для фильтра относительно ширины шкалы
  var getPinCoord = function (coord) {
    var coordsScale = lineElement.getBoundingClientRect();
    var pinLocation = coord - coordsScale.left;

    return Math.round(pinLocation * PERCENT_MAX / coordsScale.width);
  };

  var getEffectValue = function (evt, name) {
    pinCoord = getPinCoord(evt.clientX);

    return (pinCoord * (EffectParameter[name].MAX_VALUE - EffectParameter[name].MIN_VALUE) / PERCENT_MAX
      + EffectParameter[name].MIN_VALUE) + EffectParameter[name].UNIT;
  };

  var applyEffect = function (evt, name) {
    return EffectParameter[name].PROPERTY + '(' + getEffectValue(evt, name) + ')';
  };

  var setEffect = function (evt, effect) {
    imgPreviewElement.style.filter = applyEffect(evt, effect);
    levelInputElement.value = pinCoord;

    pinCoord = null;
  };

  var setPinPosition = function (evt, effect, coord) {
    pinElement.style.left = coord + '%';
    depthElement.style.width = coord + '%';

    setEffect(evt, effect);
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

  var resetEffectValue = function () {
    if (picturesElement.querySelector('.effects__list input:checked').value === DEFAULT_EFFECT) {
      effectValue = null;
    }
  };

  var toggleEffectLevel = function (target) {
    if (target.value === DEFAULT_EFFECT) {
      levelElement.classList.add('hidden');
      return;
    }

    levelElement.classList.remove('hidden');
  };

  var setMaxLevelEffect = function (name) {
    var effectPreview = (name !== DEFAULT_EFFECT) ?
      EffectParameter[name].PROPERTY + '(' + EffectParameter[name].MAX_VALUE
      + EffectParameter[name].UNIT + ')' :
      '';

    imgPreviewElement.className = EffectParameter[name].CLASS;
    imgPreviewElement.style.filter = effectPreview;
    depthElement.style.width = '100%';
    pinElement.style.left = '100%';
  };

  var effectClickHandler = function (evt) {
    var target = evt.target;

    resetEffectValue();

    if (target.tagName !== 'INPUT' || target.value === effectValue) {
      return;
    }

    toggleEffectLevel(target);

    effectValue = target.value;

    setMaxLevelEffect(effectValue);
  };

  lineElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var target = evt.target;
    var startCoord = evt.clientX;

    // условие для того, чтобы при нажатии на пин он не сдвигал курсор мыши в центр
    if (!target.classList.contains('effect-level__pin')) {
      setPinPosition(evt, effectValue, getPinCoord(startCoord));
    }

    var pinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      setPinPosition(moveEvt, effectValue, getCoordResult(shift));
    };

    var pinMouseupHandler = function () {
      document.removeEventListener('mousemove', pinMousemoveHandler);
      document.removeEventListener('mouseup', pinMouseupHandler);
    };

    document.addEventListener('mousemove', pinMousemoveHandler);
    document.addEventListener('mouseup', pinMouseupHandler);
  });

  picturesElement.querySelector('.effects__list').addEventListener('click', effectClickHandler);
})();
