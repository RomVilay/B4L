import {CommonActions} from '@react-navigation/native';
import {getUser} from '../../functions/user';
import {useEffect} from 'react';

/**
 * Réinitialise la route à la page souhaitée (suppression des routes antérieures)
 * (si pas de paramètre page, navigue vers Home par défaut)
 * @param {*} props
 * @param {String} page [Optionnel], le nom de la page où naviguer
 */
export default function goTo(props, page = 'Home') {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: page}],
    }),
  );
}

export const refreshState = async (state, setState) => {
  useEffect(() => {
    (async () => {
      let user = await getUser(state.user.username, state.token);
      if (user.message) {
        // Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
      } else {
        await setState({user, token: state.token});
      }
    })();
  }, []);
};
