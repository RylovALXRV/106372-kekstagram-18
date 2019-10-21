'use strict';

(function () {

  var DEFAULT_EFFECT = 'none';
  var PERCENT_MAX = 100;

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

  var picturesElement = document.querySelector('.pictures');
  var effectsElement = picturesElement.querySelector('.effects__list');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var levelElement = picturesElement.querySelector('.effect-level');
  var levelInputElement = levelElement.querySelector('.effect-level__value');
  var lineElement = picturesElement.querySelector('.effect-level__line');
  var depthElement = lineElement.querySelector('.effect-level__depth');
  var pinElement = lineElement.querySelector('.effect-level__pin');

  var currentEffect = null;

  // Получаю значение пина для фильтра относительно ширины шкалы
  var getPinCoord = function (coord) {
    var coordsScale = lineElement.getBoundingClientRect();
    var pinLocation = coord - coordsScale.left;

    return Math.round(pinLocation * PERCENT_MAX / coordsScale.width);
  };

  var getCoordResult = function (coord) {
    var pinCoord = getPinCoord(coord);

    if (pinCoord <= PinValue.MIN) {
      pinCoord = PinValue.MIN;
    } else if (pinCoord >= PinValue.MAX) {
      pinCoord = PinValue.MAX;
    }

    return pinCoord;
  };

  var getEffectValue = function (coord) {
    return (coord * (EffectParameter[currentEffect].MAX_VALUE - EffectParameter[currentEffect].MIN_VALUE) / PERCENT_MAX
      + EffectParameter[currentEffect].MIN_VALUE) + EffectParameter[currentEffect].UNIT;
  };

  var applyEffect = function (coord) {
    return EffectParameter[currentEffect].PROPERTY + '(' + getEffectValue(coord, currentEffect) + ')';
  };

  var setEffect = function (coord) {
    imgPreviewElement.style.filter = applyEffect(coord);
    levelInputElement.value = coord;
  };

  var setPinPosition = function (coord) {
    pinElement.style.left = coord + '%';
    depthElement.style.width = coord + '%';

    setEffect(coord);
  };

  var resetEffectValue = function () {
    if (effectsElement.querySelector('input:checked').value === DEFAULT_EFFECT) {
      currentEffect = null;
    }
  };

  var toggleEffectLevel = function (target) {
    if (target.value === DEFAULT_EFFECT) {
      levelElement.classList.add('hidden');
      levelInputElement.value = PERCENT_MAX;
      return;
    }

    levelElement.classList.remove('hidden');
  };

  var setMaxLevelEffect = function () {
    var effectPreview = (currentEffect !== DEFAULT_EFFECT) ?
      EffectParameter[currentEffect].PROPERTY + '(' + EffectParameter[currentEffect].MAX_VALUE
      + EffectParameter[currentEffect].UNIT + ')' :
      '';

    imgPreviewElement.className = EffectParameter[currentEffect].CLASS;
    imgPreviewElement.style.filter = effectPreview;
    depthElement.style.width = '100%';
    pinElement.style.left = '100%';
  };

  var effectClickHandler = function (evt) {
    var target = evt.target;

    resetEffectValue();

    if (target.tagName !== 'INPUT' || target.value === currentEffect) {
      return;
    }

    toggleEffectLevel(target);

    currentEffect = target.value;

    setMaxLevelEffect();
  };

  lineElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var target = evt.target;
    var startCoord = evt.clientX;
    var pinCoord = getCoordResult(startCoord);

    // при нажатии на пин он не сдвигал курсор мыши в центр
    if (!target.classList.contains('effect-level__pin')) {
      setPinPosition(pinCoord);
    }

    var pinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;
      pinCoord = getCoordResult(startCoord + shift);

      setPinPosition(pinCoord);
    };

    var pinMouseupHandler = function () {
      document.removeEventListener('mousemove', pinMousemoveHandler);
      document.removeEventListener('mouseup', pinMouseupHandler);
    };

    document.addEventListener('mousemove', pinMousemoveHandler);
    document.addEventListener('mouseup', pinMouseupHandler);
  });

  effectsElement.addEventListener('click', effectClickHandler);
})();
