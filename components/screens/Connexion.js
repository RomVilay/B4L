import React, {useState, useContext} from 'react';
import NetInfo from '@react-native-community/netinfo';

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

import {APP_TOKEN} from '@env';
import {Context} from '../utils/Store';
import goTo from '../utils/navFunctions';
import {login} from '../../functions/login';
import LogoMed from '../../assets/logoMed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Connexion(props) {
  const [username, setUsername] = useState('toto24');
  const [password, setPassword] = useState('toto');
  const [hasSignInInfos, setHasSignInInfos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Context);

  if (props.route.params && props.route.params.username && !hasSignInInfos) {
    setHasSignInInfos(true);
    setUsername(props.route.params.username);
    if (props.route.params.password) {
      setPassword(props.route.params.password);
    }
  }

  const checkFields = () => {
    if (
      !username.match(
        /^([a-zA-Z0-9]){5,}||[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      ) ||
      username == 'undefined'
    ) {
      Alert.alert('Erreur', `Veuillez saisir votre nom d'utilisateur`);
    } else if (!password.match(/^([a-zA-Z0-9]){3,}$/)) {
      Alert.alert('Erreur', `Veuillez saisir votre mot de passe`);
    } else {
      getAuthToken();
    }
  };

  const getAuthToken = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      const myLogin = await login({username, password}, APP_TOKEN);
      // console.log('mylogin : ', myLogin);
      if (myLogin.message) {
        Alert.alert('Erreur', `${myLogin.message}`);
        setIsLoading(false);
      } else {
        try {
          await AsyncStorage.setItem(
            '@bikeforlifeusername',
            myLogin.user.username,
          );
          await AsyncStorage.setItem('@bikeforlifepassword', password);
        } catch (e) {
          Alert.alert('Erreur', `${e}`);
        }
        await setState({user: myLogin.user, token: myLogin.token});
        setIsLoading(false);
        goTo(props);
      }
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Image
        style={styles.fond}
        source={require('../../assets/fond.png')}
        resizeMode="cover"
      />
      <LogoMed style={styles.logo} />
      <View>
        <View style={styles.top}>
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={username => setUsername(username)}
              placeholder="Nom d'utilisateur ou adresse e-mail"
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
        </View>

        <View style={styles.mid}>
          <View
            style={{
              position: 'absolute',
            }}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#5FCDFA"
                style={{top: '10%'}}
              />
            ) : (
              <Text
                onPress={() => checkFields()}
                backgroundColor="transparent"
                style={styles.connexionText}>
                Connexion
              </Text>
            )}
          </View>
          <View style={{top: 60}}>
            <Text
              onPress={() => props.navigation.navigate('ForgottenPassword')}
              backgroundColor="transparent"
              style={styles.inscriptionText1}>
              Mot de passe oublié ?
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text backgroundColor="transparent" style={styles.inscriptionText1}>
              Pas encore inscrit ?
            </Text>
            <Text
              onPress={() => props.navigation.navigate('Inscription')}
              backgroundColor="transparent"
              style={styles.inscriptionText2}>
              Créer un compte
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    position: 'relative',
    top: '20%',
  },
  mid: {
    flex: 1,
    position: 'relative',
    top: '25%',
    alignItems: 'center',
  },
  bottom: {
    position: 'relative',
    top: '30%',
    alignItems: 'center',
  },
  fond: {
    width: '110%',
    height: '120%',
    position: 'absolute',
  },
  logo: {
    position: 'relative',
    top: '5%',
  },
  input: {
    height: 45,
    width: 300,
    fontSize: 20,
    color: 'white',
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
  connexionText: {
    color: '#5FCDFA',
    fontSize: 50,
    textTransform: 'uppercase',
    fontFamily: 'TallFilms',
  },
  inscriptionText1: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 15,
    fontFamily: 'GnuolaneRG-Regular',
    top: '20%',
  },
  inscriptionText2: {
    color: '#53B4DC',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
    top: '20%',
  },
});
