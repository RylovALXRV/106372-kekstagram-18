'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var imgOverlayElement = document.querySelector('.img-upload__overlay');
  var mainElement = document.querySelector('main');

  var modalCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deletePopup(mainElement.querySelector('.modal'), modalCloseKeydownHandler);
    }
  };

  var deletePopup = function (popup) {
    popup.remove();

    document.removeEventListener('keydown', modalCloseKeydownHandler);
  };

  var loadErrorFile = function (modalElement, callback) {
    imgOverlayElement.classList.add('hidden');

    deletePopup(modalElement);
    callback();
  };

  var showError = function (errorMessage, callback) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtonElements = errorElement.querySelectorAll('.error__button');

    errorElement.querySelector('.error__title').textContent = errorMessage;

    errorElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (errorElement === element || element.classList.contains('error__button--try')) {
        deletePopup(errorElement);
      } else if (element.classList.contains('error__button--load')) {
        loadErrorFile(errorElement, callback);
      }
    });

    // Если окно загрузки фотографии закрыто, значит окно с ошибкой содержит одну кнопку
    if (imgOverlayElement.classList.contains('hidden')) {
      errorButtonElements[0].style.margin = '0px';
      errorButtonElements[1].classList.add('hidden');
    }

    document.addEventListener('keydown', modalCloseKeydownHandler);
    mainElement.appendChild(errorElement);
  };

  var showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);

    successElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (successElement === element || element.tagName === 'BUTTON') {
        deletePopup(successElement);
      }
    });

    document.addEventListener('keydown', modalCloseKeydownHandler);
    mainElement.appendChild(successElement);
  };

  window.modal = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
