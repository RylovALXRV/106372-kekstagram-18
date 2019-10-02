'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var descriptionFieldElement = picturesElement.querySelector('.text__description');
  var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
  var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var uploadCancelElement = picturesElement.querySelector('.img-upload__cancel');
  var uploadFileElement = picturesElement.querySelector('#upload-file');
  var inputChecked = picturesElement.querySelector('.effects__list input[checked]');

  var resetForm = function () {
    descriptionFieldElement.textContent = '';
    hashtagInputElement.value = '';
    imgPreviewElement.style.transform = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.className = '';
    uploadFileElement.value = '';
  };

  var setDefaultValuesForm = function () {
    document.querySelector('.scale .scale__control--value').value = '100%';
    inputChecked.checked = true;
    picturesElement.querySelector('.effect-level').classList.add('hidden');
  };

  var previewCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE &&
      evt.target !== hashtagInputElement &&
      evt.target !== descriptionFieldElement) {
      resetForm();

      window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
    }
  };

  uploadFileElement.addEventListener('change', function () {
    setDefaultValuesForm();

    window.util.openPopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  uploadCancelElement.addEventListener('click', function () {
    resetForm();

    window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  window.form = {
    inputField: inputChecked
  };
})();
