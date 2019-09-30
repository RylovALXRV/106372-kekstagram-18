'use strict';

window.util = (function () {
  return {
    ESC_KEYCODE: 27,
    closePopup: function (element, callback) {
      element.classList.add('hidden');

      document.removeEventListener('keydown', callback);
    },
    getRandomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    openPopup: function (element, callback) {
      element.classList.remove('hidden');

      document.addEventListener('keydown', callback);
    }
  };
})();
