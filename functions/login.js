const fetch = require('node-fetch');
const BASE_URL = `${process.env.BASE_URL}${process.env.PORT}`;

/**
 * Apppelle la route /login/register pour envoyer un mail de confirmation au nouvel user
 * @param {Object} data Les identifiants de nouvel utilisateur
 * @param {String} appToken La clé d'API
 * @returns Un message indiquant que l'email a été envoyé | Un message d'erreur si les champs sont invalides
 */
async function register(data, appToken) {
  let post = await fetch(`${BASE_URL}/login/register`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', 'app-token': appToken},
  }).then(res => {
    return res.json();
  });
  return post;
}

/**
 * Appelle la route /login pour connecter un utilisateur à son compte
 * @param {Object} data Le mail/username + le mot de passe
 * @param {String} appToken La clé d'API
 * @returns le token d'authentification | Un message d'erreur si mauvais identifiants
 */
async function login(data, appToken) {
  let body;
  if (data.username) {
    body = {username: data.username, password: data.password};
  } else {
    body = {mail: data.mail, password: data.password};
  }
  let post = await fetch(`${BASE_URL}/login/`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', 'app-token': appToken},
  }).then(res => {
    return res.json();
  });
  return post;
}

module.exports = {
  register,
  login,
};
