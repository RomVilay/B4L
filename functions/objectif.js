import {URL} from '../components/utils/constants';
import {fetchWithTimeout} from './fetchWithTimeout';

const serverTimeout = 5000;

async function listeObjectifs(authToken) {
    let liste = await fetchWithTimeout(
        `${URL}/goals`,
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
