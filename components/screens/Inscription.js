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
import LogoMed from '../../assets/logoMed';

export default function Inscription(props) {
  const [username, setUsername] = useState('julian');
  const [email, setEmail] = useState('aaa@gmail.com');
  const [password, setPassword] = useState('zzz');
  const [password2, setPassword2] = useState('zzzs');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Context);

  const checkFields = () => {
    if (!username.match(/^([a-zA-Z0-9]){5,}$/) || username == 'undefined') {
      Alert.alert(
        'Erreur',
        `Le nom d'utilisateur doit contenir au moins 5 caractères`,
      );
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
    } else {
      const myRegister = await register({username, password}, APP_TOKEN);
      console.log('myRegister : ', myRegister);
      if (myRegister.message) {
        Alert.alert('Erreur', `${myRegister.message}`);
      } else {
        // await setState({user: myLogin.user, token: myLogin.token});
        setIsLoading(false);
        Alert.alert(
          'Email de confirmation envoyé',
          `Un email de confirmation a été envoyé à ${email}`,
        );
        props.navigation.navigate('Connexion');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.fond}
          source={require('../../assets/fond.png')}
          resizeMode="cover"
        />
        <LogoMed style={styles.logo} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: '7%',
          }}>
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
              value={email}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
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
          <Text
            onPress={() => checkFields()}
            backgroundColor="transparent"
            style={{
              color: '#53B4DC',
              textTransform: 'uppercase',
              fontSize: 50,
              fontFamily: 'TallFilms',
              top: '3%',
            }}>
            Inscription
          </Text>
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
              fontFamily: 'TallFilms',
              top: '15%',
            }}>
            Se connecter
          </Text>
          <Text
            backgroundColor="transparent"
            style={{
              color: '#53B4DC',
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
                color: '#FFFFFF',
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 45,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
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

  logo: {
    position: 'absolute',
    top: '5%',
  },
});
