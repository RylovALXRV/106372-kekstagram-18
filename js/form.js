'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var descriptionFieldElement = picturesElement.querySelector('.text__description');
  var formElement = picturesElement.querySelector('.img-upload__form');
  var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
  var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
  var inputChecked = picturesElement.querySelector('.effects__list input[checked]');

  var setDefaultValuesForm = function () {
    document.querySelector('.scale .scale__control--value').value = '100%';
    inputChecked.checked = true;
    picturesElement.querySelector('.effect-level').classList.add('hidden');
  };

  var previewCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE &&
      evt.target !== hashtagInputElement &&
      evt.target !== descriptionFieldElement) {
      window.modal.resetForm();

      window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
    }
  };

  var closeSuccessFormSubmition = function () {
    imgOverlayElement.classList.add('hidden');

    window.modal.showSuccess();
    window.modal.resetForm();
  };

  picturesElement.querySelector('#upload-file').addEventListener('change', function () {
    setDefaultValuesForm();

    window.util.openPopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  picturesElement.querySelector('.img-upload__cancel').addEventListener('click', function () {
    window.modal.resetForm();

    window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), closeSuccessFormSubmition, window.modal.showError);
    evt.preventDefault();
  });
})();
