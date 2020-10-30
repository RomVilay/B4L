const fetch = require("node-fetch");
const BASE_URL = `${process.env.BASE_URL}${process.env.PORT}`;

/**
 * Appelle la route /users/:username et retourne l'utilisateur
 * @param {String} username Le nom d'utilisateur
 * @param {String} authToken Le token d'authentification
 * @returns L'user correspondant à l'username | Un message d'erreur si pas autorisé
 */
async function getUser(username, authToken) {
  let get = await fetch(`${BASE_URL}/users/${username}`, {
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return get;
}

/**
 * Appelle la route /users et retourne les users (accessible par admin)
 * @param {String} authToken Le token d'authentification
 * @returns La liste des users | Un message d'erreur si pas admin
 */
async function getAllUsers(authToken) {
  let get = await fetch(`${BASE_URL}/users`, {
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return get;
}

/**
 * Renvoie le nombre d'users contenus en base (accessible par admin)
 * @param {String} authToken Le token d'identification
 * @returns Le nombre d'users | Un message d'erreur si pas admin
 */
async function usersCount(authToken) {
  let count = await fetch(`${BASE_URL}/count/users`, {
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return count.count;
}

/**
 * Appelle la route /users/:username en patch et modifie l'utilisateur concerné
 * @param {String} username Le nom de l'utilisateur à modifier
 * @param {Object} body Les nouvelles informations de l'utilisateur
 * @param {String} authToken Le token d'authentification
 * @returns Les informations de l'utilisateur concené | Un message d'erreur si pas autorisé
 */
async function editUser(username, body, authToken) {
  let patch = await fetch(`${BASE_URL}/users/${username}`, {
    method: "patch",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return patch;
}

/**
 * Appelle la route /users/:username en delete et supprime l'user concerné
 * @param {String} username Le nom de l'utilisateur à supprimer
 * @param {String} authToken Le token d'authentification
 * @returns L'utilisateur supprimé | Un message d'erreur si pas autorisé
 */
async function deleteUser(username, authToken) {
  let deletedUser = await fetch(`${BASE_URL}/users/${username}`, {
    method: "DELETE",
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return deletedUser;
}

module.exports = {
  getUser,
  getAllUsers,
  usersCount,
  editUser,
  deleteUser,
};
