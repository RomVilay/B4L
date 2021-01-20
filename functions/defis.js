import {URL, PORT} from '@env';
import {fetchWithTimeout} from './fetchWithTimeout';

const BASE_URL = `${URL}:${PORT}`;
const serverTimeout = 5000;
/**
 * réccupération des défis dans la base de données
 */

async function listeDefis( authToken) {
    let liste = await fetchWithTimeout(
        `${BASE_URL}/defis`,
        {
            headers: {'auth-token': authToken},
        },
        serverTimeout,
    );
    return liste;
}
export default listeDefis
