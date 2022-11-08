import {URL, PORT} from '../components/utils/constants';
import {fetchWithTimeout} from './fetchWithTimeout';

const serverTimeout = 5000;
/**
 * réccupération des défis dans la base de données
 */

async function listeDefis( authToken, goalId) {
   // if( objectifs.length == 2){
        let liste = await fetchWithTimeout(
            `${URL}/challenges?goalId=${goalId}`,
            {
                headers: {Authorization: `Bearer ${authToken}`},
            },
            serverTimeout,
        );
        return liste;
    //}
 /*   if (objectifs.length == 1){
        let liste = await fetchWithTimeout(
            `${BASE_URL}/defis/objectif/${objectifs[0]}`,
            {
                headers: {'auth-token': authToken},
            },
            serverTimeout,
        );
        return liste;
   // }*/
}
async function listeDefisLongs( authToken, objectifs) {
    if( objectifs.length == 2){
        let liste = await fetchWithTimeout(
            `${URL}/defis/objectif/${objectifs[0]}/${objectifs[1]}`,
            {
                headers: {'auth-token': authToken, 'long':true},

            },
            serverTimeout,
        );
        return liste;
    }
    if (objectifs.length == 1){
        let liste = await fetchWithTimeout(
            `${URL}/defis/objectif/${objectifs[0]}`,
            {
                headers: {'auth-token': authToken,'long':true},
            },
            serverTimeout,
        );
        return liste;
    }
}
async function getDefi(authToken,id) {
    let defi = await fetchWithTimeout(
        `${URL}/challenges/${id}`,
        {
            headers: {Authorization: `Bearer ${authToken}`}
        }
    )
    let cibles = []
    for (let aims of defi.aims) {
        let cible = await fetchWithTimeout(
            `${URL}/aims/${aims}`,
            {
                headers: {Authorization: `Bearer ${authToken}`},
            }
        )
        cibles.push(cible)
    }
    defi.aims = cibles
    return defi
}
module.exports={
    getDefi,
    listeDefis,
    listeDefisLongs
}
