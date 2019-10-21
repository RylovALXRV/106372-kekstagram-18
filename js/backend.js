'use strict';

(function () {

  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var Request = {
    'get': {
      GET: 'GET',
      URL: 'https://js.dump.academy/kekstagram/data'
    },
    'post': {
      POST: 'POST',
      URL: 'https://js.dump.academy/kekstagram'
    }
  };

  var dataLoadHandler = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = dataLoadHandler(onLoad, onError);

    xhr.open(Request['get'].GET, Request['get'].URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = dataLoadHandler(onLoad, onError);

    xhr.open(Request['post'].POST, Request['post'].URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
