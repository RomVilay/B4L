import {
  BASE_URL,
  TIMEOUTDELAY_USER as serverTimeout,
} from '../components/utils/constants';
import {fetchWithTimeout} from './fetchWithTimeout';

/**
 * Appelle la route /users/:username et retourne l'utilisateur
 * @param {String} username Le nom d'utilisateur
 * @param {String} authToken Le token d'authentification
 * @returns L'user correspondant à l'username | Un message d'erreur si pas autorisé
 */
async function getUser(username, authToken) {
  let get = await fetchWithTimeout(
    `${BASE_URL}/users/${username}`,
    {
      headers: {'auth-token': authToken},
    },
    serverTimeout,
  );
  return get;
}

/**
 * Appelle la route /users et retourne les users (accessible par admin)
 * @param {String} authToken Le token d'authentification
 * @returns La liste des users | Un message d'erreur si pas admin
 */
async function getAllUsers(authToken) {
  let get = await fetchWithTimeout(
      `${BASE_URL}/users`,
      {
         headers: {'auth-token': authToken},
    },
  serverTimeout,
  );
  return get;
}

/**
 * Renvoie le classement d'un utilisateur avec sa position et les 3 premiers de sa catégorie
 * @param {String} id l'id utilisateur, auth token le token d'identification et la catégorie
 * @return la position de l'utilisateur et les 3 premiers membres de sa catégorie
 */
async function getClassement(username,authToken,categorie){
   let get = await fetchWithTimeout(
       `${BASE_URL}/users/${username}/classement/${categorie}`,
       {
         headers:{'auth-token':authToken,
                'Content-Type':'application/json',
                'number':100},
       },
       serverTimeout,
   );
   return get
}

/**
 * Renvoie le nombre d'users contenus en base (accessible par admin)
 * @param {String} authToken Le token d'identification
 * @returns Le nombre d'users | Un message d'erreur si pas admin
 */
async function usersCount(authToken) {
  let count = await fetchWithTimeout(`${BASE_URL}/count/users`, {
    headers: {'auth-token': authToken},
    serverTimeout,
  });
  return count.count;
}

/**
 * Appelle la route /users/:username en patch et modifie l'utilisateur concerné
 * @param {String} username Le nom de l'utilisateur à vérifier
 * @param {String} password Le mot de passe actuel de l'utilisateur
 * @param {String} authToken Le token d'authentification
 * @returns true si password valide, false sinon | Un message d'erreur si pas autorisé
 */
async function isValidPassword(username, password, authToken) {
  let isValid = await fetchWithTimeout(
    `${BASE_URL}/users/${username}/checkPassword`,
    {
      method: 'POST',
      body: JSON.stringify({password: password}),
      headers: {'Content-Type': 'application/json', 'auth-token': authToken},
    },
    serverTimeout,
  );
  return isValid;
}

/**
 * Appelle la route /users/:username en patch et modifie l'utilisateur concerné
 * @param {String} username Le nom de l'utilisateur à modifier
 * @param {Object} body Les nouvelles informations de l'utilisateur
 * @param {String} authToken Le token d'authentification
 * @returns Les informations de l'utilisateur concené | Un message d'erreur si pas autorisé
 */
async function editUser(username, body, authToken) {
  let patch = await fetchWithTimeout(
    `${BASE_URL}/users/${username}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json', 'auth-token': authToken},
    },
    serverTimeout,
  );
  return patch;
}

/**
 * Appelle la route /users/:username en delete et supprime l'user concerné
 * @param {String} username Le nom de l'utilisateur à supprimer
 * @param {String} authToken Le token d'authentification
 * @returns L'utilisateur supprimé | Un message d'erreur si pas autorisé
 */
async function deleteUser(username, authToken) {
  let deletedUser = await fetchWithTimeout(`${BASE_URL}/users/${username}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json','auth-token': authToken},
    serverTimeout,
  });
  return deletedUser;
}

module.exports = {
  getUser,
  getAllUsers,
  usersCount,
  editUser,
  deleteUser,
  isValidPassword,
  getClassement
};
