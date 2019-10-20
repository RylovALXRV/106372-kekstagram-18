'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg', 'webp'];

  var uploadElement = document.querySelector('.img-upload__preview img');
  var uploadFileElement = document.querySelector('#upload-file');

  uploadFileElement.addEventListener('change', function () {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
