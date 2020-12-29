import React, {useContext} from 'react';
import {View, StyleSheet, Image, SafeAreaView, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../utils/Store';
import goTo from '../utils/navFunctions';
import Logo from '../../assets/logo';
import {APP_TOKEN} from '@env';
import {login} from '../../functions/login';

export default function Demarrage(props) {
  const [state, setState] = useContext(Context);

  const navigate = async () => {
    // // Pour se connecter et tester directement sur la page voulue
    // let myLogin = await login({username: 'julooo', password: 'zzz'}, APP_TOKEN);
    // if (myLogin.message) {
    //   Alert.alert('Erreur', `${myLogin.message}`);
    // } else {
    //   setState({user: myLogin.user, token: myLogin.token});
    //   goTo(props, 'Parametres2');
    // }
    try {
      let storedUsername = await AsyncStorage.getItem('@username');
      let storedPassword = await AsyncStorage.getItem('@password');
      if (storedUsername !== null && storedPassword !== null) {
        let myLogin = await login(
          {username: storedUsername, password: storedPassword},
          APP_TOKEN,
        );
        if (myLogin.message) {
          Alert.alert('Erreur', `${myLogin.message}`);
          props.navigation.navigate('Connexion');
        } else {
          setState({user: myLogin.user, token: myLogin.token});
          goTo(props);
        }
      } else {
        props.navigation.navigate('Connexion');
      }
    } catch (e) {
      Alert.alert('Erreur', `${e}`);
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
        <Logo style={styles.logo} />
        <Text style={styles.text} onPress={() => navigate('Connexion')}>
          Start
        </Text>
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
  fond: {
    width: '110%',
    height: '120%',
    position: 'absolute',
  },
  logo: {
    position: 'absolute',
    top: 150,
  },
  text: {
    color: '#5FCDFA',
    fontSize: 70,
    textTransform: 'uppercase',
    fontFamily: 'TallFilms',
    position: 'absolute',
    top: 550,
  },
});
