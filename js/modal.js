'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var imgOverlayElement = document.querySelector('.img-upload__overlay');
  var mainElement = document.querySelector('main');
  var picturesElement = document.querySelector('.pictures');
  var descriptionFieldElement = picturesElement.querySelector('.text__description');
  var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var uploadFileElement = picturesElement.querySelector('#upload-file');

  // Перенес ф-ию из form.js для того, чтобы сбрасывать стили в окне с ошибкой,
  // при нажатии на кнопку Загрузить другой файл
  var resetForm = function () {
    descriptionFieldElement.value = '';
    hashtagInputElement.value = '';
    imgPreviewElement.style.transform = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.className = '';
    uploadFileElement.value = '';
  };

  var errorCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deletePopup(mainElement.querySelector('.error'), errorCloseKeydownHandler);
    }
  };

  var successCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deletePopup(mainElement.querySelector('.success'), successCloseKeydownHandler);
    }
  };

  var deletePopup = function (popup, callback) {
    popup.remove();

    document.removeEventListener('keydown', callback);
  };

  var loadErrorFile = function (modalElement, callback) {
    imgOverlayElement.classList.add('hidden');
    deletePopup(modalElement, callback);
    resetForm();
  };

  var removeModal = function (modalElement, callback) {
    modalElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (modalElement === element || element.classList.contains('error__button--try') ||
        element.classList.contains('success__button')) {
        deletePopup(modalElement, callback);
      } else if (element.classList.contains('error__button--load')) {
        loadErrorFile(modalElement, callback);
      }
    });
  };

  var showError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtons = errorElement.querySelectorAll('.error__button');

    errorElement.querySelector('.error__title').textContent = errorMessage;

    document.addEventListener('keydown', errorCloseKeydownHandler);
    removeModal(errorElement, errorCloseKeydownHandler);

    // Если окно загрузки фотографии закрыто, значит окно с ошибкой содержит одну кнопку
    if (imgOverlayElement.classList.contains('hidden')) {
      errorButtons[0].style.margin = '0px';
      errorButtons[1].classList.add('hidden');
    }

    mainElement.appendChild(errorElement);
  };

  var showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);

    document.addEventListener('keydown', successCloseKeydownHandler);
    removeModal(successElement, successCloseKeydownHandler);

    mainElement.appendChild(successElement);
  };

  window.modal = {
    resetForm: resetForm,
    showError: showError,
    showSuccess: showSuccess
  };
})();
