import {CommonActions} from '@react-navigation/native';

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
