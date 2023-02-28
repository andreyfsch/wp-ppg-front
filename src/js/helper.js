import 'regenerator-runtime/runtime';
import configs from './configs/index.js';
const { TIMEOUT_SEC, LOCAL } = configs;

const timeout = function (s) {
  return new Promise(function (_resolve, reject) {
    setTimeout(function () {
      reject(new Error('A requisição levou tempo demais!' +
        `Tempo esgotado após ${s} segundos`));
    }, s * 1000);
  });
};

const AJAX = async function (url) {
  const fetchPro = LOCAL
    ? fetch(url, {
      method: 'GET',
      headers: {
        Origin: 'application/json'
      }
    })
    : fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

  const responseObj = await res.json();

  const data = responseObj.data;

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

export default AJAX;
