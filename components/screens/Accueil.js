// Imports Modules
import React, {useState, useContext} from 'react';
import {Context} from '../utils/Store';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import Cercle from '../../assets/Accueil/cercle';
import NavApp from '../navigation/NavApp';
import {refreshState} from '../utils/navFunctions';
var avatar = require('../../assets/avatar.png');
import Avatar from "./Avatar";
import DefisLong from "./DefisLong";

export default function Accueil(props) {
  const [state, setState] = useContext(Context);
  const [defisL,setDefisL] = useState(true)
  // const [name, setName]= useState('Gaston')
  // const [kcal, setKcal]= useState('5400')
  // const [km, setKm] = useState('234.0')
  // const [watts,setWatts] = useState('4000')
  refreshState(state, setState);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <DefisLong visible={state.user.defisLongs.length == 0} />
      {/* HEADER */}
      <View style={styles.header}>
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
            <Text style={styles.chiffres}>{Number.parseFloat(state.user.totalEnergie*0.239).toFixed(2)}</Text>
            <Text style={[styles.midText]}>
              kcal <Text style={{color: '#5FCDFA'}}>cumulées</Text>
            </Text>
          </View>
          <View style={styles.midItem}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Classements')}>
             <Avatar avatar={state.user.avatar ? state.user.avatar : "03940"}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{state.user.totalDistance}</Text>
            <Text style={[styles.midText]}>
              km <Text style={{color: '#5FCDFA'}}>cumulés</Text>
            </Text>
          </View>
        </View>
        <View style={styles.midBot}>
          <Text style={styles.chiffres}>{state.user.totalEnergie}</Text>
          <Text style={[styles.midText]}>
            wh <Text style={{color: '#5FCDFA'}}>produits</Text>
          </Text>
        </View>
      </View>
      {/* FIN MIDDLE */}

      {/* FOOTER */}
      <TouchableOpacity
        style={styles.footer}
        activeOpacity={0.5}
        onPress={() => /* pop up open ici*/props.navigation.navigate('ListeDefis')}>
        <Cercle />
        <Text style={styles.go}>GO</Text>
      </TouchableOpacity>
      <View style={styles.end} />
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
    width: '100%',
    zIndex: 100,
    // backgroundColor: 'red',
  },

  item: {
    top: '5%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 100,
  },

  middle: {
    flex: 3,
    width: '100%',
    zIndex: 100,
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  midTop: {
    flex: 2,
    // width: '100%',
    // marginBottom: 20,
    justifyContent: 'center',
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
    flex: 2,
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


  footer: {
    flex: 3,
    // flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // marginBottom: '5%',
    // width: '100%',
    // zIndex: 100,
    // backgroundColor: 'red',
  },
  go: {
    color: '#56ADCE',
    fontSize: 130,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 100,
    // top: 10,
  },
  end: {
    flex: 0.5,
  },
  fond: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '150%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
