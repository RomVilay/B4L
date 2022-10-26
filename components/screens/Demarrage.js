import React, {useContext} from 'react';
import {View, StyleSheet, Image, SafeAreaView, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../utils/Store';
import goTo from '../utils/navFunctions';
import Logo from '../../assets/logo';
import {login} from '../../functions/login';
import jwt_decode from "jwt-decode";
import {getUser} from "../../functions/user";
/**
 * Ecran de démarrage de l'application
 * @param {*} props 
 * @returns 
 */
export default function Demarrage(props) {
  const [state, setState] = useContext(Context);

  const navigate = async () => {
    // // Pour se connecter et tester directement sur la page voulue
    // let myLogin = await login({username: 'julooo', password: 'zzz'});
    // if (myLogin.message) {
    //   Alert.alert('Erreur', `${myLogin.message}`);
    // } else {
    //   setState({user: myLogin.user, token: myLogin.token});
    //   goTo(props, 'Parametres2');
    // }
    try {
      let storedUsername = await AsyncStorage.getItem('@bikeforlifeusername');
      let storedPassword = await AsyncStorage.getItem('@bikeforlifepassword');
      if (storedUsername !== null && storedPassword !== null) {
        let myLogin = await login({username: storedUsername, password: storedPassword});
        if (myLogin.message) {
          Alert.alert('Erreur', `${myLogin.message}`);
          props.navigation.navigate('Connexion');
        } else {
          let usrid =(jwt_decode(myLogin["auth-token"]).id)
          const user = await getUser(usrid,myLogin["auth-token"])
          setState({user: user, token: myLogin["auth-token"]});
         // if (user.goals && user.goals > 0) {
            goTo(props);
          /*} else {
            goTo(props, 'Objectifs');
          }*/
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
        <Image style={styles.fond} source={require('../../assets/fond.png')} resizeMode="cover" />
        <Logo style={styles.logo} />
        <Text style={styles.text} onPress={() => navigate('Connexion')}>
          Start
        </Text>
        <Text style={{color:"white", position:"absolute" ,bottom:30, fontSize:20}} onPress={() => props.navigation.navigate("Setup")}>
          Setup
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
    top: '75%',
  },
});
