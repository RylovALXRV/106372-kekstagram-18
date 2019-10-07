'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = errorMessage;

    document.body.appendChild(errorElement);
  };

  window.error = {
    render: renderError
  };
})();
