import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Context} from '../utils/Store';
import {ADMIN_TOKEN} from '@env';
import goTo from '../utils/navFunctions';
import {editUser} from '../../functions/user';
import LogoMin from '../../assets/logoMin';
import Fleche from '../../assets/fleche';
import avatar from '../../assets/avatar.png';
import NavApp from '../navigation/NavApp';

export default function Parametres(props) {
  const [state, setState] = useContext(Context);
  const [parties] = useState([
    'Visage',
    'Coupe',
    'Couleur',
    'Tenue',
    'Accessoire',
  ]);
  const [selection, setSelection] = useState('Visage');
  const [isLoading, setIsLoading] = useState(false);
  const [tempDateNaissance, setTempDateNaissance] = useState(
    state.user.dateNaissance || '',
  );
  const [tempTaille, setTempTaille] = useState(state.user.taille || '');
  const [tempPoids, setTempPoids] = useState(state.user.poids || '');

  const checkFields = () => {
    if (
      !tempDateNaissance.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/) &&
      tempDateNaissance.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir un date de naissance valide`);
    } else if (
      !tempTaille.match(/^[0-9]{1,4}\,{0,1}[0-9]{0,2}$/) &&
      tempTaille.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir une taille valide`);
    } else if (
      !tempPoids.match(/^[0-9]{1,4}\,{0,1}[0-9]{0,2}$/) &&
      tempPoids.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir un poids valide`);
    } else {
      updateUser();
    }
  };

  const updateUser = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      const updated = await editUser(
        state.user.username,
        {
          dateNaissance: tempDateNaissance,
          poids: tempPoids,
          taille: tempTaille,
        },
        // ADMIN_TOKEN,
        state.token,
      );
      setIsLoading(false);
      console.log('updated : ', updated);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
      } else {
        setState({user: updated, token: state.token});
        goTo(props);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <KeyboardAwareScrollView style={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          <LogoMin />
          <Text style={styles.textTitle}>{state.user.username}</Text>
        </View>
        {/* FIN HEADER */}

        {/* MID */}
        <View style={styles.middle}>
          <View style={styles.midTop}>
            <TouchableOpacity
              onPress={() => {
                console.log('gauche');
              }}>
              <Fleche />
            </TouchableOpacity>
            <Image source={avatar} />
            <TouchableOpacity
              onPress={() => {
                console.log('droite');
              }}>
              <Fleche
                style={{
                  transform: [{rotate: '180deg'}],
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.midMid}>
            <View style={styles.inlineItems}>
              {parties.map(item => (
                <React.Fragment key={item}>
                  <View>
                    {item != selection ? (
                      <TouchableOpacity
                        onPress={() => {
                          setSelection(item);
                        }}>
                        <Text style={styles.linesw}>{item}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.linesb}>{item}</Text>
                    )}
                  </View>
                  {item !== parties[parties.length - 1] ? (
                    <View style={styles.separator} />
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          </View>
          <View style={styles.midBot}>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempDateNaissance}
                style={styles.input}
                onChangeText={dateNaissance =>
                  setTempDateNaissance(dateNaissance)
                }
                placeholder="Indiquez date de naissance"
                placeholderTextColor="#b8b8b8"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempTaille}
                style={styles.input}
                onChangeText={taille => setTempTaille(taille)}
                placeholder="Indiquez votre taille"
                placeholderTextColor="#b8b8b8"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempPoids}
                style={styles.input}
                onChangeText={poids => setTempPoids(poids)}
                placeholder="Indiquez votre poids"
                placeholderTextColor="#b8b8b8"
              />
            </View>
          </View>
        </View>
        {/* FIN MID */}

        {/* FOOTER */}
        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#5FCDFA"
              style={{top: '10%'}}
            />
          ) : (
            <TouchableOpacity onPress={() => checkFields()}>
              <Text style={[styles.suivant]}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* FIN FOOTER */}
      </KeyboardAwareScrollView>
      <NavApp style={styles.navApp} navigation={props.navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  textTitle: {
    top: '10%',
    color: '#FFFF',
    textTransform: 'uppercase',
    fontSize: 45,
    fontFamily: 'GnuolaneRG-Regular',
  },
  middle: {
    marginTop: '5%',
    marginBottom: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 100,
    width: '100%',
  },
  midTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100,
    width: '80%',
    marginBottom: '5%',
  },
  midMid: {
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    width: '80%',
    paddingBottom: '3%',
    marginBottom: '5%',
  },
  midBot: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
  },
  inlineItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    width: 5,
    height: 5,
    backgroundColor: '#5FCDFA',
  },
  whiteTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
  linesb: {
    color: '#5FCDFA',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  linesw: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  suivant: {
    textTransform: 'uppercase',
    fontSize: 40,
    color: '#5FCDFA',
    fontFamily: 'TallFilms',
  },
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  input: {
    height: 45,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    width: '100%',
    paddingBottom: '5%',
  },
  fond: {
    width: '100%',
    height: '120%',
    position: 'absolute',
  },
});
