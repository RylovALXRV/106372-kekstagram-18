'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg', 'webp'];

  var uploadFile = document.querySelector('#upload-file');
  var uploadElement = document.querySelector('.img-upload__preview img');

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
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
