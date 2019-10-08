'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var errorCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deletePopup(mainElement.querySelector('.error'), errorCloseKeydownHandler);
    }
  };

  var deletePopup = function (popup, callback) {
    popup.remove();

    document.removeEventListener('keydown', callback);
  };

  var removeModal = function (modalElement, button) {
    modalElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (modalElement === element || button === evt.target) {
        deletePopup(modalElement, errorCloseKeydownHandler);
      }
    });
  };

  var showError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtons = errorElement.querySelectorAll('.error__button');

    errorElement.querySelector('.error__title').textContent = errorMessage;
    errorButtons[0].style.margin = '0px';
    errorButtons[1].classList.add('hidden');

    document.addEventListener('keydown', errorCloseKeydownHandler);
    removeModal(errorElement, errorButtons[0]);

    mainElement.appendChild(errorElement);
  };

  window.modal = {
    showError: showError
  };
})();
