const fetch = require('node-fetch');

async function fetchWithTimeout(url, options, delay = 10000) {
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
    console.log('Server Timeout');
    return {message: 'Erreur du serveur, veuillez réessayer plus tard'};
  }
  return response;
}

module.exports = {
  fetchWithTimeout,
};
