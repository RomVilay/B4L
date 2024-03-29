import {URL, TIMEOUTDELAY_LOGIN as serverTimeout} from '../components/utils/constants';
import {fetchWithTimeout} from './fetchWithTimeout';
import {APP_TOKEN} from '@env';

/**
 * Apppelle la route /login/register pour envoyer un mail de confirmation au nouvel user
 * @param {Object} data Les identifiants de nouvel utilisateur
 * @param {String} appToken La clé d'API
 * @returns Un message indiquant que l'email a été envoyé | Un message d'erreur si les champs sont invalides
 */
async function register(data, appToken = APP_TOKEN) {
  let post = await fetchWithTimeout(
    `${URL}/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json', 'app-token': appToken},
    },
    serverTimeout,
  );
  return post;
}

/**
 * Appelle la route /login pour connecter un utilisateur à son compte
 * @param {Object} data Le mail/username + le mot de passe
 * @param {String} appToken La clé d'API
 * @returns le token d'authentification | Un message d'erreur si mauvais identifiants
 */
async function login(data, appToken = APP_TOKEN) {
  let body;
  if (data.username) {
    body = {username: data.username, password: data.password};
  } else {
    body = {mail: data.mail, password: data.password};
  }
  let post = await fetchWithTimeout(
    `${URL}/auth/login/`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json', 'accept':'*/*'},
    },
    serverTimeout,
  );
  return post;
}

/**
 * Appelle la route /forgottenPassword pour envoyer un mail à la personne concernée
 * @param {Object} data Le mail sous la forme d'object {mail: mail}
 * @param {String} appToken La clé d'API
 * @returns Un message indiquant que le mail a bien été envoyé | Un message d'erreur si l'e-mail n'existe pas
 */
async function forgottenPassword(data, appToken = APP_TOKEN) {
  let post = await fetchWithTimeout(
    `${URL}/login/forgottenPassword`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json', 'app-token': appToken},
    },
    serverTimeout,
  );
  return post;
}

module.exports = {
  register,
  login,
  forgottenPassword,
};
