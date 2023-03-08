import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Context } from '../utils/Store';
import { regexPrenom, regexNom, regexEmail, regexPassword } from '../utils/constants';
import goTo from '../utils/navFunctions';
import { editUser, isValidPassword, deleteUser } from '../../functions/user';

import LogoMin from '../../assets/logoMin';
import NavApp from '../navigation/NavApp';
/**
 * écran de changement du mot de passe, mail, nom d'utilisateur et déconnexion
 * @param {*} props 
 * @returns 
 */
export default function Parametres2(props) {
  const [state, setState] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditPwd, setIsEditPwd] = useState(false);
  const [tempPrenom, setTempPrenom] = useState(state.user.firstName || '');
  const [tempNom, setTempNom] = useState(state.user.lastName || '');
  const [tempMail, setTempMail] = useState(state.user.email || '');
  const [tempPassword, setTempPassword] = useState('');
  const [tempPassword1, setTempPassword1] = useState('');
  const [tempPassword2, setTempPassword2] = useState('');
  const [refPwd, setRefPwd] = useState(null);

  let inputs = {
    prenom: {
      getter: tempPrenom,
      setter: setTempPrenom,
      title: 'Prénom',
      placeholder: 'prénom',
      reference: null,
    },
    nom: {
      getter: tempNom,
      setter: setTempNom,
      title: 'Nom',
      placeholder: 'nom',
      reference: null,
    },
    mail: {
      getter: tempMail,
      setter: setTempMail,
      title: 'Adresse e-mail',
      placeholder: 'adresse e-mail',
      reference: null,
    },
    pwd: {
      getter: tempPassword,
      setter: setTempPassword,
      title: 'Mot de passe actuel',
    },
    pwd1: {
      getter: tempPassword1,
      setter: setTempPassword1,
      title: 'Nouveau mot de passe',
      reference: null,
    },
    pwd2: {
      getter: tempPassword2,
      setter: setTempPassword2,
      title: 'Confirmer le nouveau mot de passe',
      reference: null,
    },
  };

  const checkFields = async () => {
    if (!tempPrenom.match(regexPrenom) && tempPrenom.length > 0) {
      Alert.alert('Erreur', `Veuillez saisir un prénom valide`);
      inputs['prenom'].reference.focus();
    } else if (!tempNom.match(regexNom) && tempNom.length > 0) {
      Alert.alert('Erreur', `Veuillez saisir un nom valide`);
      inputs['nom'].reference.focus();
    } else if (!tempMail.match(regexEmail)) {
      Alert.alert('Erreur', `Veuillez saisir une adresse e-mail valide`);
      inputs['mail'].reference.focus();
    } else if (tempPassword1 !== tempPassword2) {
      Alert.alert('Erreur', `Les deux mots de passes doivent correspondre`);
      setTempPassword1('');
      setTempPassword2('');
      inputs['pwd1'].reference.clear();
      inputs['pwd2'].reference.clear();
      inputs['pwd1'].reference.focus();
    } else if (!tempPassword1.match(regexPassword) && tempPassword1.length > 0) {
      Alert.alert('Erreur', `Le nouveau mot de passe doit contenir au moins 3 caractères`);
      setTempPassword1('');
      setTempPassword2('');
      inputs['pwd1'].reference.clear();
      inputs['pwd2'].reference.clear();
      inputs['pwd1'].reference.focus();
    } else if (tempPassword.length == 0) {
      Alert.alert('Erreur', 'Veuillez saisir votre mot de passe pour appliquer les modifications');
      refPwd.focus();
    } else {
      setIsLoading(true);
      /*let res = await isValidPassword(state.user.id, tempPassword, state.token);
      if (res.message) {
        Alert.alert('Erreur', `${res.message}`);
        setIsLoading(false);
      } else if (res) {*/
      updateUser();
      /*} else {
        setIsLoading(false);
        Alert.alert('Erreur', `Mot de passe incorrect`);
        refPwd.focus();
      }*/
    }
  };

  const updateUser = async () => {
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      setIsLoading(false);
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      console.log(tempPassword)
      const updated = await editUser(
        state.user.id,
        {
          lastName: tempNom,
          firstname: tempPrenom,
          email: tempMail,
          password: tempPassword1 !== "" ? tempPassword1 : tempPassword,
          currentPassword: tempPassword
        },
        state.token,
      );
      // console.log('updated : ', updated);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
        setIsLoading(false);
      } else {
        if (tempMail !== state.user.mail) {
          Alert.alert(
            'Information',
            'Pour que la modification de votre adresse e-mail soit effective, veuillez consulter le mail que nous vous avons envoyé à votre nouvelle adresse.',
          );
        }
        if (tempPassword1 !== '') {
          await AsyncStorage.setItem('@bikeforlifepassword', tempPassword1);
        }
        updated.goals = state.user.goals
        updated.challenges = state.user.challenges
        setState({ user: updated, token: state.token });
        setIsLoading(false);
        goTo(props);
      }
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await deleteLocalStorage();
    setState({ user: {}, token: '' });
    setIsLoading(false);
    goTo(props, 'Demarrage');
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    let res = await isValidPassword(state.user.id, tempPassword, state.token);
    if (res.message) {
      Alert.alert('Erreur Authentification', `${res.message}`);
      setIsLoading(false);
    } else if (!res) {
      setIsLoading(false);
      Alert.alert('Erreur Authentification', `Mot de passe incorrect`);
      refPwd.focus();
    } else {
      await deleteLocalStorage();
      let res = await deleteUser(state.user.id, state.token);
      console.log(res)
      if (res.error) {
        Alert.alert('Erreur suppression', "Quelque chose s'est mal passé, contactez BikeForLife. Erreur : " + res.message);
        setIsLoading(false);
      } else {
        setState({ user: {}, token: '' });
        setIsLoading(false);
        goTo(props, 'Demarrage');
      }
    }
  };

  const deleteLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem('@bikeforlifeusername');
      await AsyncStorage.removeItem('@bikeforlifepassword');
    } catch (e) {
      Alert.alert('Erreur', `${e}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <KeyboardAwareScrollView style={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          <LogoMin />
          <Text style={styles.textTitle}>Paramètres du compte</Text>
        </View>
        {/* FIN HEADER */}

        {/* MID */}
        <View style={[styles.middle, isEditPwd ? null : { paddingBottom: '10%' }]}>
          {Object.keys(inputs).map((item, index) =>
            (item != 'pwd1' && item != 'pwd2') || ((item == 'pwd1' || item == 'pwd2') && isEditPwd) ? (
              <View style={styles.items} key={index}>
                <Text style={styles.inputTitle}>{inputs[item].title}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={ref => {
                      item == 'pwd' ? setRefPwd(ref) : (inputs[item].reference = ref);
                    }}
                    value={inputs[item].getter}
                    style={styles.input}
                    onChangeText={name => inputs[item].setter(name)}
                    keyboardType={inputs[item].placeholder == 'adresse e-mail' ? 'email-address' : null}
                    secureTextEntry={item == 'pwd' || item == 'pwd1' || item == 'pwd2' ? true : false}
                    placeholder={inputs[item].placeholder ? 'Indiquez votre ' + inputs[item].placeholder : null}
                    placeholderTextColor="#b8b8b8"
                  />
                </View>
              </View>
            ) : null,
          )}
          {isEditPwd ? null : (
            <TouchableHighlight onPress={() => setIsEditPwd(true)}>
              <Text style={styles.editPwd}>Modifier le mot de passe</Text>
            </TouchableHighlight>
          )}
        </View>
        {/* FIN MID */}

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.loading}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#5FCDFA" style={{ top: '10%' }} />
            ) : (
              <TouchableOpacity onPress={() => checkFields()}>
                <Text style={styles.textBottom}>Enregistrer</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.horizontal}>
            <TouchableOpacity
              onPress={() => {
                isLoading
                  ? null
                  : Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
                    {
                      text: 'Oui',
                      onPress: () => logout(),
                    },
                    {
                      text: 'Annuler',
                      style: 'cancel',
                    },
                  ]);
              }}>
              <Text style={styles.textBottom}>Déconnexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                isLoading
                  ? null
                  : Alert.alert(
                    'Suppression du compte',
                    'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est définitive',
                    [
                      {
                        text: 'Oui',
                        onPress: () => {
                          if (tempPassword == '') {
                            Alert.alert(
                              'Erreur',
                              'Veuillez renseigner votre mot de passe pour supprimer votre compte.',
                            );
                          } else {
                            deleteAccount();
                          }
                        },
                      },
                      {
                        text: 'Annuler',
                        style: 'cancel',
                      },
                    ],
                  );
              }}>
              <Text style={styles.textBottom}>Supprimer</Text>
              <Text style={styles.textBottom}>mon compte</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* FIN FOOTER */}
        <View style={{ marginTop: 30 }}>
          <NavApp style={styles.navApp} navigation={props.navigation} />
        </View>
      </KeyboardAwareScrollView>
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
    marginTop: '10%',
    color: '#FFFF',
    textTransform: 'uppercase',
    fontSize: 45,
    fontFamily: 'GnuolaneRG-Regular',
  },
  middle: {
    marginTop: '5%',
    paddingBottom: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // zIndex: 100,
    width: '100%',
  },
  items: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '5%',
  },
  inputTitle: {
    color: '#5FCDFA',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  inputContainer: {
    // width: '80%',
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 20,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  textBottom: {
    textTransform: 'uppercase',
    fontSize: 40,
    color: '#5FCDFA',
    fontFamily: 'TallFilms',
  },
  editPwd: {
    width: '120%',
    fontSize: 30,
    color: '#FFFF',
    fontFamily: 'TallFilms',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  loading: {
    // flex: 1,
    width: '100%',
    top: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // backgroundColor: 'blue',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: '15%',
    // backgroundColor: 'black',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 100,
    width: '100%',
    // paddingTop: '5%',
    marginBottom: '10%',
    // backgroundColor: 'red',
  },
  fond: {
    width: '100%',
    height: '120%',
    position: 'absolute',
  },
});
