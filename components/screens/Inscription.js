import React, {useState, useContext} from 'react';
import {Context} from '../utils/Store';

import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {register} from '../../functions/login';
import {APP_TOKEN} from '@env';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LogoMed from '../../assets/logoMed';

export default function Inscription(props) {
  const [username, setUsername] = useState('julooo');
  const [mail, setMail] = useState('teykilae@gmail.com');
  const [password, setPassword] = useState('zzz');
  const [password2, setPassword2] = useState('zzz');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Context);

  const checkFields = () => {
    if (!username.match(/^([a-zA-Z0-9]){5,}$/) || username == 'undefined') {
      Alert.alert(
        'Erreur',
        `Le nom d'utilisateur doit contenir au moins 5 caractères`,
      );
    } else if (
      !mail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      ) ||
      mail == 'undefined'
    ) {
      Alert.alert('Erreur', `L'adresse e-mail n'est pas valide`);
    } else if (
      !password.match(/^([a-zA-Z0-9]){3,}$/) ||
      password == 'undefined'
    ) {
      Alert.alert(
        'Erreur',
        `Le mot de passe doit contenir au moins 3 caractères`,
      );
    } else if (password2 !== password) {
      Alert.alert('inscription', 'veuillez saisir un mot de passe identique', [
        {text: 'fermer'},
      ]);
    } else {
      sendConfirmMail();
    }
  };

  const sendConfirmMail = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
      setIsLoading(false);
    } else {
      const myRegister = await register({username, password, mail}, APP_TOKEN);
      // console.log('myRegister : ', myRegister);
      if (myRegister.message) {
        setIsLoading(false);
        Alert.alert('Erreur', `${myRegister.message}`);
      } else {
        setIsLoading(false);
        Alert.alert(
          'Email de confirmation envoyé',
          `Un email de confirmation a été envoyé à ${mail}`,
        );
        props.navigation.navigate('Connexion', {
          username: username,
          password: password,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <KeyboardAwareScrollView style={styles.scroll}>
        <View style={styles.top}>
          <LogoMed style={styles.logo} />
        </View>
        <View style={styles.mid}>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <TextInput
                value={username}
                style={styles.input}
                onChangeText={username => setUsername(username)}
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={mail}
                style={styles.input}
                keyboardType="email-address"
                onChangeText={mail => setMail(mail)}
                placeholder="Adresse mail"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={password}
                style={styles.input}
                onChangeText={password => setPassword(password)}
                placeholder={'Mot de passe'}
                secureTextEntry={true}
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={password2}
                style={styles.input}
                onChangeText={password2 => setPassword2(password2)}
                placeholder={'Validez votre mot de passe'}
                secureTextEntry={true}
                placeholderTextColor="#FFFFFF"
              />
            </View>
          </View>
          <View style={styles.loading}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#5FCDFA"
                style={{bottom: '30%'}}
              />
            ) : (
              <Text
                onPress={() => checkFields()}
                backgroundColor="transparent"
                style={{
                  color: '#53B4DC',
                  textTransform: 'uppercase',
                  fontSize: 50,
                  fontFamily: 'TallFilms',
                }}>
                Inscription
              </Text>
            )}
          </View>
        </View>

        <View style={styles.bottom}>
          <Text
            backgroundColor="transparent"
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: 15,
              fontFamily: 'GnuolaneRG-Regular',
              top: '15%',
            }}>
            Vous avez déjà un compte ?
          </Text>
          <Text
            onPress={() => props.navigation.navigate('Connexion')}
            backgroundColor="transparent"
            style={{
              color: '#53B4DC',
              textTransform: 'uppercase',
              fontSize: 25,
              fontFamily: 'GnuolaneRG-Regular',
              top: '15%',
            }}>
            Se connecter
          </Text>
          <Text
            backgroundColor="transparent"
            style={{
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontSize: 15,
              fontFamily: 'GnuolaneRG-Regular',
              top: '20%',
              margin: '5%',
            }}>
            En vous inscrivant, vous acceptez nos
            <Text
              onPress={() => props.navigation.navigate('Termes')}
              backgroundColor="transparent"
              style={{
                color: '#53B4DC',
                textTransform: 'uppercase',
                fontSize: 15,
                fontFamily: 'GnuolaneRG-Regular',
                top: '20%',
              }}>
              {' '}
              Termes et conditions
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  top: {
    marginTop: '8%',
    marginBottom: '10%',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  mid: {
    paddingBottom: '20%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  bottom: {
    marginTop: '15%',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  loading: {
    position: 'absolute',
    // backgroundColor: 'orange',
  },
  input: {
    height: 45,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'GnuolaneRG-Regular',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  fond: {
    width: '110%',
    height: '120%',
    position: 'absolute',
  },
});
