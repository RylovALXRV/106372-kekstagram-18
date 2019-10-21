'use strict';

window.util = (function () {
  return {
    ESC_KEYCODE: 27,
    closePopup: function (element, callback) {
      element.classList.add('hidden');

      document.removeEventListener('keydown', callback);
    },
    openPopup: function (element, callback) {
      element.classList.remove('hidden');

      document.addEventListener('keydown', callback);
    }
  };
})();
