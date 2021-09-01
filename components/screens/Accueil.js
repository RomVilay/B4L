// Imports Modules
import React, {useState, useContext} from 'react';
import {Context} from '../utils/Store';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity, Platform
} from 'react-native';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import Cercle from '../../assets/Accueil/cercle';
import NavApp from '../navigation/NavApp';
import {refreshState} from '../utils/navFunctions';
var avatar = require('../../assets/avatar.png');
import Avatar from "./Avatar";
import DefisLong from "./DefisLong";
import * as RNLocalize from "react-native-localize";

export default function Accueil(props) {
  const [state, setState] = useContext(Context);
  const [defisL,setDefisL] = useState(true)
  const [indices,setIndices] = useState([["KCAL","dépensés"],["WH","produits"],["KM","cumulés"]])
  const [datacumul,setDatacumul] = useState([0,0,0])
  React.useEffect(()=>{
    if (Object.keys(state.user).length !== 0){
      let dist = state.user.totalDistance !== undefined ? formatDistance(state.user.totalDistance) : formatDistance(0)
      let energie = state.user.totalEnergie !== undefined ? formatEnergie(state.user.totalEnergie, "wh") : formatEnergie(0, "wh")
      switch (state.user.goals[0]){
        case "1bf5d297-5ff1-42a1-9f48-98d45ad113f0":
          let e2 = state.user.totalEnergie !== undefined ? formatEnergie(state.user.totalEnergie, "cals") : formatEnergie(0, "cals")
          setIndices([[e2[1],"dépensés"],[energie[1],"produits"],[dist[1],"cumulés"]])
          setDatacumul([e2[0],energie[0],dist[0]])
          break;
        case "42098d44-1ad3-4a25-9272-c957d1800797":
          e2 = state.user.totalEnergie !== undefined ? formatEnergie(state.user.totalEnergie, "cals") : formatEnergie(0, "cals")
          setIndices([[energie[1],"produits"],[e2[1],"brulées"],[dist[1],"cumulés"]])
          setDatacumul([energie[0],e2[0],dist[0]])
          break;
        /*case "2":
          e2 = state.user.totalEnergie !== undefined ? formatEnergie(state.user.totalEnergie, "$") : : formatEnergie(0, "$")
          setDatacumul([energie[0],e2[0],dist[0]])
          setIndices([[energie[1],"produits"],[e2[1],"économisées"],[dist[1],"cumulés"]])
          break;
        case "3":
          e2 = formatEnergie(state.user.totalEnergie, "co2")
          setDatacumul([e2[0],energie[0],dist[0]])
          setIndices([[e2[1],"économisées"],[energie[1],"produits"],[dist[1],"cumulés"]])
          break;
        case "4":
          //kcals = Number.parseFloat(state.user.totalEnergie*0.239).toFixed(2)
          e2 = formatEnergie(state.user.totalEnergie, "cals")
          setDatacumul([e2[0],energie[0],dist[0]])
          setIndices([[e2[1],"dépensés"],[energie[1],"générés"],[dist[1],"cumulés"]])
          break;*/
        default :
          //e2 = state.user.totalEnergie !== undefined ? formatEnergie(state.user.totalEnergie, "cals") : formatEnergie(0, "cals")
          //setIndices([0,"dépensés"],[0,"produits"],[0,"cumulés"])
          //setDatacumul([0,0,0])
              break;
      }
    }
  },[state.user])

  // const [name, setName]= useState('Gaston')
  // const [kcal, setKcal]= useState('5400')
  // const [km, setKm] = useState('234.0')
  // const [watts,setWatts] = useState('4000')
  refreshState(state, setState);

  function formatDistance (distance){
    if(state.user.unitDistance === "m" ){
      if (distance < 1000){
        return [distance, 'm']
      }
      else {
        return [Number.parseFloat(distance*Math.pow(10,-3)).toFixed(2), "km"]
      }
    }
    if ( state.user.unitDistance === "ft") {
        return [Math.round(distance/0.302), "ft"]
    }
    if ( state.user.unitDistance === "yd") {
      return [Math.round(distance/0.9144), "yd"]
    }
    if ( state.user.unitDistance === "mi") {
      return [Math.round(distance/1609.3472), "mi"]
    }
  }
  function formatEnergie (energie,unit) {
    let resp = []
    if (unit === "wh"){
      energie < 1000 ? resp = [energie,unit] : resp = [Math.round(energie*Math.pow(10,-3)),"KWH"]
    }
    if (unit === "cals"){
      energie/860.8321 < 1000 ? resp = [Math.round(energie/860.8321),"CALS"] : resp = [Math.round(energie/860.8321)*Math.pow(10,-3),"KCALS"]
    }
    if (unit === "co2"){
      var co2 = 0
      switch (RNLocalize.getCountry()) {
        case "FR":
          co2 = 72
          break;
        case "GB":
          co2 = 457
          break;
        case "US":
          co2 = 522
          break;
      }
      energie*Math.pow(10,-3)*co2 < 1000 ? resp = [ Number.parseFloat(energie*Math.pow(10,-3)*co2).toFixed(2),"gCO2"] : resp = [Math.round(energie*Math.pow(10,-3)*co2*Math.pow(10,-3)),"kgCO2"]
    }
    if ( unit === "$"){
     switch (RNLocalize.getCountry()){
       case "FR":
         resp = [ Math.round(energie * 0.1546), "€"]
        break;
       case "US":
         resp = [ Math.round(energie * 0.1189), "$"]
        break;
       case "GB":
         resp = [ Math.round(energie * 0.16633), "£"]
     }
    }
    return resp
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      {
        //Object.keys(state.user).length === 0 || Object.keys(state.user.challenges).length !== 0 ? <></> : <DefisLong visible={state.user.challenges.length == 0} />
      }
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
            <Text style={styles.chiffres}>{isNaN(datacumul[0]) ? 0: datacumul[0]}</Text>
            <Text style={[styles.midText,{marginLeft:Platform.OS === 'android' ? '27%' : '5%'}]}>
              {indices[0][0]} <Text style={{color: '#5FCDFA'}}>{indices[0][1]}</Text>
            </Text>
          </View>
          <View style={styles.midItem}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Classements')}>
             <Avatar avatar={state.user.avatar ? state.user.avatar : "03940"}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.midItem]}>
            <Text style={styles.chiffres}>{isNaN(datacumul[2]) ? 0: datacumul[2]}</Text>
            <Text style={[styles.midText]}>
              {indices[2][0]} <Text style={{color: '#5FCDFA'}}>{indices[2][1]}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.midBot}>
          <Text style={styles.chiffres}>{isNaN(datacumul[1]) ? 0: datacumul[1]}</Text>
          <Text style={[styles.midText]}>
            {indices[1][0]} <Text style={{color: '#5FCDFA'}}>{indices[1][1]}</Text>
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
