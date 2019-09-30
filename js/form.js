'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var descriptionFieldElement = picturesElement.querySelector('.text__description');
  var hashtagInputElement = picturesElement.querySelector('.text__hashtags');
  var imgOverlayElement = picturesElement.querySelector('.img-upload__overlay');
  var imgPreviewElement = picturesElement.querySelector('.img-upload__preview img');
  var uploadCancelElement = picturesElement.querySelector('.img-upload__cancel');
  var uploadFileElement = picturesElement.querySelector('#upload-file');

  var previewCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE &&
      evt.target !== hashtagInputElement &&
      evt.target !== descriptionFieldElement) {
      window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);

      uploadFileElement.value = '';
    }
  };

  var resetStylesByOpenPopup = function () {
    descriptionFieldElement.textContent = '';
    hashtagInputElement.value = '';
    imgPreviewElement.style.transform = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.className = '';
    document.querySelector('.scale .scale__control--value').value = '100%';
    picturesElement.querySelector('.effects__list input[checked]').checked = true;
    picturesElement.querySelector('.effect-level').classList.add('hidden');
  };

  uploadFileElement.addEventListener('change', function () {
    resetStylesByOpenPopup();

    window.util.openPopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  uploadCancelElement.addEventListener('click', function () {
    window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
  });

  uploadCancelElement.addEventListener('keydown', function () {
    window.util.closePopup(imgOverlayElement, previewCloseKeydownHandler);
  });
})();
