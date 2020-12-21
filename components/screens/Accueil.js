// Imports Modules
import React, {useState, useContext} from 'react';
import {Context} from '../utils/Store';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import Cercle from '../../assets/Accueil/cercle';
import NavApp from '../navigation/NavApp';

var avatar = require('../../assets/avatar.png');

export default function Accueil(props) {
  const [state, setState] = useContext(Context);
  // const [name, setName]= useState('Gaston')
  // const [kcal, setKcal]= useState('5400')
  // const [km, setKm] = useState('234.0')
  // const [watts,setWatts] = useState('4000')

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      {/* HEADER */}
      <View style={[styles.header, {width: '100%'}]}>
        <View style={styles.item} />
        <View style={styles.item}>
          <LogoMin />
        </View>
        <View style={styles.item} />
      </View>
      {/* FIN HEADER */}

      {/* MIDDLE */}
      <View style={styles.middle}>
        <View style={styles.midTop}>
          <Text style={styles.nom}>{state.user.username}</Text>
        </View>
        <View style={styles.midMid}>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{state.user.kcal}</Text>
            <Text style={[styles.midText]}>
              kcal <Text style={{color: '#5FCDFA'}}>cumulées</Text>
            </Text>
          </View>
          <View style={styles.midItem}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Classements')}>
              <Image source={avatar} />
            </TouchableOpacity>
          </View>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{state.user.km}</Text>
            <Text style={[styles.midText]}>
              km <Text style={{color: '#5FCDFA'}}>cumulés</Text>
            </Text>
          </View>
        </View>
        <View style={styles.midBot}>
          <Text style={styles.chiffres}>{state.user.watts}</Text>
          <Text style={[styles.midText]}>
            wh <Text style={{color: '#5FCDFA'}}>produits</Text>
          </Text>
        </View>
      </View>
      {/* FIN MIDDLE */}

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footer}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Jumelage')}>
          <Cercle />
          <Text style={styles.go}>GO</Text>
        </TouchableOpacity>
      </View>
      {/* FIN FOOTER */}
      <NavApp navigation={props.navigation} />
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
    // alignItems: 'flex-start',
    justifyContent: 'space-around',
    zIndex: 100,
    // backgroundColor: 'red',
  },

  item: {
    top: '5%',
    zIndex: 100,
    // justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 100,
  },

  middle: {
    flex: 3,
    width: '100%',
    zIndex: 100,
    // backgroundColor: 'orange',
  },
  midTop: {
    flex: 1,
    // width: '100%',
    // marginBottom: 20,
    // backgroundColor: 'blue',
    alignItems: 'center',
  },

  midMid: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    // backgroundColor: 'pink',
  },

  midItem: {
    flex: 1,
    justifyContent: 'space-around',
    // height: 0,
    alignItems: 'center',
    zIndex: 100,
    // backgroundColor: 'red',
  },

  midBot: {
    flex: 1.5,
    alignItems: 'center',
    zIndex: 100,
    // backgroundColor: 'black',
  },
  nom: {
    color: 'white',
    fontSize: 50,
    textTransform: 'uppercase',
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
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    // zIndex: 100,
    // bottom: '10%',
    // backgroundColor: 'brown',
  },
  go: {
    color: '#56ADCE',
    fontSize: 130,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 100,
    // top: 10,
  },
  rank: {
    width: '20%',
    height: '10%',
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
});
