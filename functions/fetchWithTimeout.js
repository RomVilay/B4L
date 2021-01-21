// const fetch = require('node-fetch');
import {TIMEOUTDELAY_DEFAULT} from '../components/utils/constants';

async function fetchWithTimeout(url, options, delay = TIMEOUTDELAY_DEFAULT) {
  try {
    const timer = new Promise(resolve => {
      setTimeout(resolve, delay, {
        timeout: true,
      });
    });
    const response = await Promise.race([
      fetch(url, options).then(res => {
        return res.json();
      }),
      timer,
    ]);
    if (response.timeout) {
      console.log('Server Timeout on ', options.method, url);
      return {message: 'Erreur du serveur, veuillez réessayer plus tard'};
    }
    return response;
  } catch (e) {
    console.log('Network Error', e, options.method, url);
    return {
      message:
        'Erreur du serveur/de réseau, contactez BikeForLife.\nErreur : ' + e,
    };
  }
}

module.exports = {
  fetchWithTimeout,
};
