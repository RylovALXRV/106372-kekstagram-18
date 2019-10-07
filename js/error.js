'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var errorCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deletePopup();
    }
  };

  var deletePopup = function () {
    document.querySelector('.error').remove();

    document.removeEventListener('keydown', errorCloseKeydownHandler);
  };

  var removeError = function (errorElement) {
    errorElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (element.classList.contains('error') || errorElement.querySelector('.error__button') === evt.target) {
        errorElement.remove();
      }
    });
  };

  var renderError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = errorMessage;

    document.addEventListener('keydown', errorCloseKeydownHandler);
    removeError(errorElement);

    mainElement.appendChild(errorElement);
  };

  window.error = {
    render: renderError
  };
})();
