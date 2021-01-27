import {URL, PORT} from '@env';
import {fetchWithTimeout} from './fetchWithTimeout';

const BASE_URL = `${URL}:${PORT}`;
const serverTimeout = 5000;
/**
 * réccupération des défis dans la base de données
 */

async function listeDefis( authToken, objectifs) {
    if( objectifs.length == 2){
        console.log(`${BASE_URL}/defis/objectif/${objectifs[0]}/${objectifs[1]}`)
        let liste = await fetchWithTimeout(
            `${BASE_URL}/defis/objectif/${objectifs[0]}/${objectifs[1]}`,
            {
                headers: {'auth-token': authToken},
            },
            serverTimeout,
        );
        return liste;
    }
    if (objectifs.length == 1){
        let liste = await fetchWithTimeout(
            `${BASE_URL}/defis/objectif/${objectifs[0]}`,
            {
                headers: {'auth-token': authToken},
            },
            serverTimeout,
        );
        return liste;
    }
}
export default listeDefis
