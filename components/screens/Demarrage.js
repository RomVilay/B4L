import React, {useContext} from 'react';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';

import {Context} from '../utils/Store';
import goTo from '../utils/navFunctions';
import Logo from '../../assets/logo';
import Fingerprint from '../../assets/fingerprint';
import NavApp from '../navigation/NavApp';

export default function Demarrage(props) {
  const [state] = useContext(Context);

  const navigate = () => {
    if (state.user.username && state.token != '') {
      console.log('user already logged in');
      goTo(props);
    } else {
      props.navigation.navigate('Connexion');
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
        <Fingerprint
          onPress={() => navigate()}
          style={{
            color: 'white',
            position: 'absolute',
            top: 550,
            fontSize: 30,
          }}
        />
      </View>
      <NavApp navigation={props.navigation} />
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
});
