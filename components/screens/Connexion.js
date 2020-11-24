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

import {login} from '../../functions/login';
import {APP_TOKEN} from '@env';
import NetInfo from '@react-native-community/netinfo';
import LogoMed from '../../assets/logoMed';

export default function Connexion(props) {
  const [username, setUsername] = useState('julian');
  const [password, setPassword] = useState('zzz');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Context);

  if (state.user.username) {
    props.navigation.navigate('Home');
  }

  const checkFields = () => {
    if (!username.match(/^([a-zA-Z0-9]){5,}$/) || username == 'undefined') {
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
        // Alert.alert('Erreur', `${myLogin.message}`);
        setIsLoading(false);
      } else {
        await setState({user: myLogin.user, token: myLogin.token});
        setIsLoading(false);
        props.navigation.navigate('Home');
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
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={username => setUsername(username)}
              placeholder="Nom d'utilisateur"
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
              // bottom: '30%',
              // margin: 0,
              // padding: 0,
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
                style={{
                  color: '#5FCDFA',
                  fontSize: 50,
                  textTransform: 'uppercase',
                  fontFamily: 'TallFilms',
                }}>
                Connexion
              </Text>
            )}
          </View>
          <View style={styles.bottom}>
            <Text
              backgroundColor="transparent"
              style={{
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 15,
                fontFamily: 'GnuolaneRG-Regular',
                top: '20%',
              }}>
              Pas encore inscrit ?
            </Text>
            <Text
              onPress={() => props.navigation.navigate('Inscription')}
              backgroundColor="transparent"
              style={{
                color: '#53B4DC',
                textTransform: 'uppercase',
                fontSize: 25,
                fontFamily: 'GnuolaneRG-Regular',
                top: '20%',
              }}>
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
  container: {
    // flex: 1,
    // height: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  top: {
    position: 'relative',
    top: '20%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mid: {
    flex: 1,
    position: 'relative',
    top: '25%',
    alignItems: 'center',
  },
  bottom: {
    position: 'relative',
    top: '25%',
    alignItems: 'center',
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
    position: 'relative',
    top: '5%',
  },
});
