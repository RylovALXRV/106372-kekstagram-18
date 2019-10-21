'use strict';

(function () {

  var picturesElement = document.querySelector('.pictures');
  var descriptionFieldElement = picturesElement.querySelector('.text__description');
  var formElement = picturesElement.querySelector('.img-upload__form');
  var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
  var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var inputCheckedElement = picturesElement.querySelector('.effects__list input[checked]');
  var uploadFileElement = picturesElement.querySelector('#upload-file');

  var resetForm = function () {
    descriptionFieldElement.value = '';
    hashtagInputElement.value = '';
    imgPreviewElement.style.transform = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.className = '';
    uploadFileElement.value = '';
  };

  var setDefaultValuesForm = function () {
    document.querySelector('.scale .scale__control--value').value = '100%';
    inputCheckedElement.checked = true;
    picturesElement.querySelector('.effect-level').classList.add('hidden');
  };

  var uploadCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE &&
      evt.target !== hashtagInputElement &&
      evt.target !== descriptionFieldElement) {
      resetForm();

      window.util.closePopup(imgOverlayElement, uploadCloseKeydownHandler);
    }
  };

  var closeSuccessFormSubmition = function () {
    imgOverlayElement.classList.add('hidden');

    window.modal.showSuccess();
    resetForm();
  };

  var closeUnsuccessFormSubmition = function (errorMessage) {
    window.modal.showError(errorMessage, resetForm);
  };

  picturesElement.querySelector('#upload-file').addEventListener('change', function () {
    setDefaultValuesForm();

    window.util.openPopup(imgOverlayElement, uploadCloseKeydownHandler);
  });

  picturesElement.querySelector('.img-upload__cancel').addEventListener('click', function () {
    resetForm();

    window.util.closePopup(imgOverlayElement, uploadCloseKeydownHandler);
  });

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), closeSuccessFormSubmition, closeUnsuccessFormSubmition);
    evt.preventDefault();
  });
})();
