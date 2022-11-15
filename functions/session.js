import {fetchWithTimeout} from './fetchWithTimeout';
import {
  URL
} from '../components/utils/constants';
const serverTimeout = 5000;
/**
 * Apppelle la route /sessions/ pour créer un nouvel user
 * @param {Object} data Les informations
 * @param {String} authToken Le token d'authentification
 * @returns Le nouvel utilisateur | Un message d'erreur si les champs sont invalides
 */
async function createSession(data, authToken) {
  console.log(data)
  let post = await fetchWithTimeout(`${URL}/sessions`, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}` },
  },
      serverTimeout)
  console.log(post)
  return post;
}

/**
 * Appelle la route /sessions et retourne toutes les sessions (accessible par admin)
 * @param {String} authToken Le token d'authentification
 * @returns La liste des sessions | Un message d'erreur si pas admin
 */
async function getAllSessions(authToken) {
  let get = await fetchWithTimeout(`${URL}/sessions`, {
    headers: { "Authorization": `Bearer ${authToken}` },
    serverTimeout
  })
  return get;
}

/**
 * Appelle la route /sessions/:id et renvoie la session demandée
 * @param {String} idSession L'identifiant de la session
 * @param {String} authToken Le token d'identification
 * @returns la session correspondante | un message d'erreur si mauvaise authentification
 */
async function getSession(idSession, authToken) {
  let get = await fetchWithTimeout(`${URL}/sessions/${idSession}?sequences=true`, {
    headers: { "Authorization": `Bearer ${authToken}` },
    },
    serverTimeout)
  return get;
}

/**
 * Appelle la route /sessions/user/:username et renvoie la session demandée
 * @param {String} username Le nom d'utilisateur du propriétaire des sessions
 * @param {String} authToken Le token d'identification
 * @returns les sessions correspondantes | un message d'erreur si mauvaise authentification
 */
async function getSessionsByUser(id, authToken) {
  let get = await fetchWithTimeout(`${URL}/sessions?userId=${id}&limit=10&offset=0&orderByDate=true`, {
    headers: { "Authorization": `Bearer ${authToken}` },
  },
      serverTimeout)
  return get;
}

/**
 * Renvoie le nombre de sessions contenues en base (accessible par admin)
 * @param {String} authToken Le token d'identification
 * @returns Le nombre de sessions | Un message d'erreur si pas admin
 */
async function sessionsCount(authToken) {
  let count = await fetch(`${URL}/count/sessions`, {
    headers: { "Authorization": `Bearer ${authToken}`  },
  }).then((res) => {
    return res.json();
  });
  return count.count;
}

/**
 * Renvoie le nombre de sessions par user
 * @param {String} username L'utilisateur à qui appartient les sessions
 * @param {String} authToken Le token d'identification
 * @returns Le nombre de sessions | Un message d'erreur si pas autorisé
 */
async function sessionsCountByUsername(username, authToken) {
  let count = await fetch(`${URL}/count/sessions/${username}`, {
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return count.count;
}

/**
 * Appelle la route /sessions/:id en patch et modifie la session concernée
 * @param {String} id L'identifiant de la session à modifier
 * @param {Object} body Les nouvelles informations de la session
 * @param {String} authToken Le token d'authentification
 * @returns Les informations de la session concenée | Un message d'erreur si pas autorisé
 */
async function editSession(id, body, authToken) {
  let patch = await fetchWithTimeout(`${URL}/sessions/${id}`, {
    method: "patch",
    body: JSON.stringify(body),
    headers: {  "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}` },
  },
  serverTimeout)
  return patch;
}

/**
 * Appelle la route /sessions/:id en delete et supprime la session concernée (admin uniquement)
 * @param {String} id L'identifiant de la session à supprimer
 * @param {String} authToken Le token d'authentification
 * @returns La session supprimée | Un message d'erreur si pas admin
 */
async function deleteSession(id, authToken) {
  let deletedSession = await fetch(`${URL}/sessions/${id}`, {
    method: "DELETE",
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return deletedSession;
}

/**
 * Appelle la route /sessions/user/:username en delete et supprime les sessions liées à l'user
 * @param {String} username L'username lié aux sessions à supprimer
 * @param {String} authToken Le token d'authentification
 * @returns Un message : suppression ok | Un message d'erreur si pas autorisé
 */
async function deleteSessionByUsername(username, authToken) {
  let deletedSession = await fetch(`${URL}/sessions/user/${username}`, {
    method: "DELETE",
    headers: { "auth-token": authToken },
  }).then((res) => {
    return res.json();
  });
  return deletedSession;
}

/**
 * Appelle la route /sessions/user/:id_user
 *@param {String} id_user l'id de base de donnée de l'utilisateur
 * @returns toutes les sessions de l'utilisateur
 */

async function  createSequence(data,authToken){
  console.log("data: "+JSON.stringify(data))
  let createSequence = await fetchWithTimeout(`${URL}/sequences`, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}` },
    },
    serverTimeout)
  //console.log(createSequence)
  return createSequence;
}



module.exports = {
  createSession,
  getAllSessions,
  getSession,
  getSessionsByUser,
  sessionsCount,
  sessionsCountByUsername,
  editSession,
  deleteSession,
  deleteSessionByUsername,
  createSequence
};
