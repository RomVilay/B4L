// Imports Modules
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../utils/Store';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import Cercle from '../../assets/cercle';
import NavApp from '../navigation/NavApp';

// Imports Components
import Battery from '../screens/Battery';
import Horloge from '../screens/Horloge';

var avatar = require('../../assets/avatar.png');

export default function Accueil(props) {
  // state = {
  //   name: 'Gaston',
  //   kcal: '5400',
  //   km: '234.0',
  //   watts: '40000',
  //   avatar: avatar,
  // };
  const [state, setState] = useContext(Context);

  useEffect(() => {
    props.navigation.addListener('beforeRemove', e => {
      // e.preventDefault();
      // props.navigation.popToTop();
      // props.navigation.navigate('Demarrage');
      return;
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <View style={[styles.header, {width: '100%'}]}>
        <View style={styles.item} />
        <View style={styles.item}>
          <LogoMin />
        </View>
        <View style={styles.item}>
          <Battery />
          <Horloge />
        </View>
      </View>
      <View style={[styles.middle, {width: '100%'}]}>
        <View style={styles.midTop}>
          <Text style={styles.nom}>{state.user.username}</Text>
        </View>
        <View style={styles.midMid}>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{state.kcal}</Text>
            <Text style={[styles.midText]}>
              kcal <Text style={{color: '#5FCDFA'}}>cumulées</Text>
            </Text>
          </View>
          <View style={styles.midItem}>
            <TouchableHighlight
              onPress={() => props.navigation.navigate('Classements')}>
              <Image source={avatar} />
            </TouchableHighlight>
          </View>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{state.km}</Text>
            <Text style={[styles.midText]}>
              km <Text style={{color: '#5FCDFA'}}>cumulés</Text>
            </Text>
          </View>
        </View>
        <View style={styles.midBot}>
          <Text style={styles.chiffres}>{state.watts}</Text>
          <Text style={[styles.midText]}>
            wh <Text style={{color: '#5FCDFA'}}>produits</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Cercle />
        <Text
          style={styles.go}
          onPress={() => props.navigation.navigate('Jumelage')}>
          GO
        </Text>
      </View>
      <NavApp
        style={{flex: 1, justifyContent: 'center'}}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    zIndex: 100,
  },

  item: {
    top: '5%',
    width: 80,
    height: 100,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    bottom: '20%',
  },

  midMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },

  midItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
  },

  midBot: {
    alignItems: 'center',
    zIndex: 100,
  },
  nom: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'GnuolaneRG-Regular',
  },
  midText: {
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
    fontFamily: 'TallFilms',
  },
  chiffres: {
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
    fontFamily: 'GnuolaneRG-Regular',
  },

  fond: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '110%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 100,
    bottom: '20%',
  },
  go: {
    color: '#56ADCE',
    fontSize: 130,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 100,
    top: 10,
  },
  rank: {
    width: '20%',
    height: '10%',
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
});
