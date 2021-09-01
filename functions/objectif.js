import {URL, PORT} from '../components/utils/constants';
import {fetchWithTimeout} from './fetchWithTimeout';

const BASE_URL = `${URL}${PORT}`;
const serverTimeout = 5000;

async function listeObjectifs(authToken) {
    let liste = await fetchWithTimeout(
        `${BASE_URL}/goals`,
        {
            headers: {Authorization: `Bearer ${authToken}`},
        },
        serverTimeout,
    )
    return liste
}
module.exports={
    listeObjectifs
}
