import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import NavApp from '../navigation/NavApp';
// Imports Components
import Fleche from '../../assets/fleche';
import {Stopwatch} from 'react-native-stopwatch-timer';
import SegmentedRoundDisplay from 'react-native-segmented-round-display/src';
import Svg from 'react-native-svg';
import AfficheurCompteur from './afficheurConpteur';
import AfficheurDonnees from "./afficheurDonnees";
import navigation from "../../assets/navigation";
import SliderDefis from "./sliderDefis";
export default function Compteur (props) {
    const rotateValueHolder= React.useRef(new Animated.Value(0)).current;
    const [start,setStart] = React.useState(true)
    const [reset,setReset] = React.useState(false)
    const [pause,setPause] =React.useState('')
    const [currentTime,setCTime] = React.useState('')
    const[startPosition,setSPosition] = React.useState(-160)
    const[endPosition,setEPosition] = React.useState(-130)
    const outputRange = ['0deg', '10deg']
    const [seg,setSeg] = React.useState(0)
    const [angle,setAngle] = React.useState(-150)
    const [up,setUp] = React.useState(true)
    const [defis,setDefis] = React.useState(props.route.params.defis)
    const [defisValid,setDefisValid] = React.useState([])
    const [defic,setDefic] = React.useState(0)
    const[watts,setWatts] = React.useState(200)
    const state = {
      kmp: 0,
      kmh: 0,
      kmc: 10,
      watts: 200,
      rpm: 0,
      kcal: 0,
      time: '',
      angle: -150,
      startPosition: -160,
      endPosition: -130,
      outputRange: ['0deg', '10deg'],
      seg: 0,
      up: true,
    };
    /*this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this._isMounted = false*/

  const toggleStopwatch = () => {
      setStart(!start)
      setReset(false)
    pause === ''
      ? setPause( 'Pause')
      : setPause( '');
  }
  const resetStopwatch = () => {
      setStart(false)
      setReset(true)
  }

  //fonction qui défini la rotation à effectuer
  function randomRotation (){
     if (up) {
        const nend = endPosition + 10;
        const ang = `${nend}deg`; //définition de la valeur de rotation
        setSPosition(endPosition)
        setEPosition(nend)
        setAngle(nend)
        seg >= 4 ? setUp(false) : setSeg(seg => seg+1)
        /*if (endPosition >= -100) {
          setUp(false)
        }*/
      } else {
        const nend = endPosition - 10;
        const ang = `${nend}deg`; //définition de la valeur de rotation
        setSPosition(endPosition)
        setEPosition(nend)
       setSeg(seg => seg-1)
        setAngle(nend)
        if (endPosition <= -130) {
          setUp(true);
        }
      }
  }
  //déclenchement de l'animation du compteur à l'ouverture de la page
  React.useEffect(()=> {
    StartImageRotateFunction()
    const  interval = setInterval(() => {
     randomRotation()
    }, 900); //mise à jour du tableau d'interpolation de la rotation, toutes les 6s
    return() =>{
      clearInterval(interval)
    }
  },[seg,endPosition,startPosition,angle,up])

  //fonction animation
  const StartImageRotateFunction = () => {
    rotateValueHolder.setValue(startPosition)//définition de la position de départ pour l'animation
    Animated.timing(rotateValueHolder, {
      toValue: endPosition,
      Easing: 'linear',
      duration: 1000,
    }).start(); // animation de la rotation
  }
  //animation de déplacement des valeur pour la flèche droite

  //fonction de déplacement des valeur en sens inverse

  //fonction quitter la session
  const AlertQuit = () =>
    Alert.alert(
      '',
      'Voulez vous arrêter la session ?',
      [
        {
          text: 'continuer',
          style: 'cancel',
        },
        {
          text: 'quitter la session',
          onPress: () => props.navigation.navigate('Home'),
        },
      ],
      {cancelable: false},
    );
    //définition du tableau d'interpolation pour la première rotation
    const rotation = rotateValueHolder.interpolate({
      inputRange: [0, 10],
      outputRange: outputRange,
    });
    //définition des positions pour les différentes valeurs

   function ValiderDefis () {
     setDefisValid([...defisValid,defis[defic]])
     setDefic(defic => defic+1)
   }
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/fond.png')} style={styles.fond} />
        <View style={styles.header}>
          <LogoMin />
          <Stopwatch
            start={start}
            reset={reset}
            options={options}
            getTime={(time) => setCTime(time)}
            msec={true}
          />
          <Text
            style={{color: '#5FCDFA', fontSize: 30, fontFamily: 'TallFilms'}}>
            {pause}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 30, left: 20}}
            onPress={() => {
              AlertQuit();
            }}>
            <Icon name="power-settings-new" size={40} color="white" />
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
            <SliderDefis defis={defis} defisV={defisValid} current={defic}/>
            <TouchableOpacity onPress={() => ValiderDefis() } >
              <Text>valid</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middle}>
          <ImageBackground
            source={require('../../assets/Compteur/compteur.png')}
            style={styles.compteur}>
            <Animated.Image
              source={require('../../assets/Compteur/aiguille.png')}
              style={[{transform: [{rotate: rotation}]}, styles.aiguille]}
            />
            <AfficheurCompteur style={styles.graph} i={seg} />
            <AfficheurDonnees />
          </ImageBackground>
          <View style={[{flex: 1, flexDirection: 'row', marginLeft: '25%'}]}>
            <TouchableOpacity onPress={() => {
              setWatts(watts-5)
            }}>
              <Text style={[styles.midText, {fontSize: 60, marginRight: '5%', marginTop:30}]}> - </Text>
            </TouchableOpacity>
            <View style={[styles.textbloc,{marginTop:30}]}>
              <Text style={[styles.midText, {fontSize: 60, marginTop:10}]}>
                {' '}
                {watts}{' '}
              </Text>
              <Text style={[styles.midText2]}>watts </Text>
             </View>
            <TouchableOpacity
                onPress={() => {
                  setWatts(watts+5);
                }}>
              <Text
                  style={[styles.midText, {fontSize: 70, marginRight: '5%', marginTop:25}]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
              style={[styles.midText2, { margin:'5%', zIndex:600}]}
              onPress={() => toggleStopwatch()}>
            <Text style={[styles.midText, {fontSize: 30}]}>Pause</Text>
          </TouchableOpacity>
          { /*<NavApp navigation={this.props.navigation}  style={{marginTop:20}}/>  */}
        </View>
      </SafeAreaView>
    );

}
//style compteur
const options = {
  container: {
    width: 220,
    marginLeft: '22%',
  },
  text: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'GnuolaneRG-Regular',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },

  header: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    padding: 5,
    paddingBottom: '9%',
  },
  stopwatch: {
    backgroundColor: 'transparent',
    width: '25%',
    color: 'white',
    fontSize: 35,
    textTransform: 'uppercase',
  },
  middle: {
    flex: 4,
    flexDirection: 'column',
    zIndex: 100,
  },
  compteur: {
    height:300,
    width:400,
    flex: 2,
    resizeMode: 'contain',
    justifyContent: 'center',
    zIndex: 0,
  },
  aiguille: {
    top: '20%',
    bottom: '28%',
    width: 200,
    height: 235,
    position: 'absolute',
    resizeMode: 'stretch',
    marginLeft: '22%',
    alignContent: 'center',
    zIndex: 0,
  },
  graph: {
    position: 'absolute',
    top: 0,
    left: 30,
    width: Dimensions.get('window').width - 55,
    height: 350,
    zIndex: 0,
  },
  midTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    marginLeft: '10%',
    paddingTop: '20%',
  },
  fondBulle: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  midMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingLeft: '32%',
  },
  flecheG: {
    marginTop: '5%',
    transform: [{scale: 2}],
    marginRight: '20%',
  },
  flecheD: {
    marginTop: '5%',
    transform: [{scale: 2}, {rotate: '180deg'}],
    marginLeft: '50%',
    right: '5%',
  },
  midBot: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
    marginLeft: '12%',
    paddingBottom: '10%'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  item: {
    width: 80,
    height: 80,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },

  midText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'GnuolaneRG-Regular',
  },
  midText2: {
    color: '#5FCDFA',
    fontSize: 30,
    textTransform: 'uppercase',
    fontFamily: 'TallFilms',
  },
  textbloc: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  fond: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '150%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  fondCompteur: {
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    zIndex: -100,
    top: -110,
    left: '-20%',
    width: 50,
  },
});
