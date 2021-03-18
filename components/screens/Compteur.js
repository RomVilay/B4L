import React, {useContext, useState} from 'react';
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
  ActivityIndicator,
   Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";
// Imports Assets
import LogoMin from '../../assets/logoMin';
// Imports Components

import {Stopwatch} from 'react-native-stopwatch-timer';

import AfficheurCompteur from './afficheurConpteur';
import AfficheurDonnees from "./afficheurDonnees";

import SliderDefis from "./sliderDefis";
import {createSession, editSession} from '../../functions/session';
import {editUser} from '../../functions/user';
import {getDefi} from '../../functions/defis';

import {Context} from "../utils/Store";
import goTo from '../utils/navFunctions';
import {ModalError} from './modalError'
import TcpSocket from 'react-native-tcp-socket';

import NotificationSounds, {playSampleSound} from 'react-native-notification-sounds'

export default function Compteur (props) {
  const [state, setState] = useContext(Context);
  const [modal,setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const rotateValueHolder= React.useRef(new Animated.Value(0)).current;
  const [start,setStart] = React.useState(true)
  const [reset,setReset] = React.useState(false)
  const [pause,setPause] =React.useState('')
  const [currentTime,setCTime] = React.useState('')
  const [startPosition,setSPosition] = React.useState(-160)
  const [endPosition,setEPosition] = React.useState(-125)
  const outputRange = ['0deg', '10deg']
  const [seg,setSeg] = React.useState(10)
  const [angle,setAngle] = React.useState(-150)
  const [up,setUp] = React.useState(true)
  const [defis,setDefis] = React.useState(props.route.params.defis)
  const [defisValid,setDefisValid] = React.useState([])
  const [defic,setDefic] = React.useState(0)
  const [watts,setWatts] = React.useState(200)
  const [vitesses,setVitesses] = React.useState([])
  const [inclinaison,setInclinaison] = React.useState([])
  const [energie,setEnergie] = React.useState(0)
  const [distance,setDistance] = React.useState(0)
  //const [ws,setWs] = React.useState(Platform.OS === "ios" ? new WebSocket("ws://localhost:8100") : new WebSocket("ws://echo.websocket.org"))
  const [erreur,setErreur] = React.useState()
  const [session,setSession] = React.useState()
  const [styleModal,setStyleModal] = React.useState(styles.dangerModal)
  let [t,setT] = React.useState(15)
  const[timeModal,setTimeModal] = React.useState()
  const [server,setServer] = React.useState(new TcpSocket.Socket());
    /*this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this._isMounted = false*/


  ///faire calcul points défis

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
  const saveSession = async () => {
    if (defisValid.length>=0){
    const data = {
      "defis":defisValid.map(defi => defi._id),
      "vitesse":vitesses,
      "inclinaison":inclinaison,
      "idUser":state.user._id,
      "dateSession":moment(),
      "dureeSession":moment.duration(currentTime).asSeconds(),
      "distance":distance,
      "energie":energie,

    }
    if (session == undefined){
      const s = await createSession(data,state.token)
      if (s.message) {
        Alert.alert('Erreur création session', s.message);
        console.log(s.message)
      } else {
        setSession(s)
      }
    }
    else {
      const s = await editSession(session._id,data,state.token)
      if (s.message) {
        Alert.alert('Erreur session', s.message);
        console.log(s.message)
      } else {
        setSession(s)
      }
    }
      let tab = defisValid.filter(defi => defi.long !== undefined).map(defi=>defi._id)
      const userdata = {
        "totalDuree":state.user.totalDuree+moment.duration(currentTime).asSeconds(),
        "totalEnergie":isNaN(state.user.totalEnergie+energie) ? 1 : state.user.totalEnergie+energie,
        "totalDistance":state.user.totalDistance+distance,
        "totalPoints":defisValid.length > 0 ? defisValid.map(defi=>defi.points).reduce((total,defi)=>total+defi.points) : 0
      }
      const updated  = await  editUser(state.user.username,userdata,state.token)
      if (updated.message) {
        Alert.alert('Erreur update', updated.message);
        console.log(updated.message)
      } else {
        setState({user: updated, token: state.token})
      }
    }
  }

  //fonction qui défini la rotation à effectuer
  function randomRotation (){
     if (up) {
       endPosition > -100 ? setUp(false) : setSeg(seg => seg+7)
        const nend = endPosition + 10;
        setSPosition(endPosition)
        setEPosition(nend)
        setAngle(nend)
        setVitesses([...vitesses,seg])
        setInclinaison([...inclinaison,1])
        setEnergie(energie=>energie+100)
       setDistance(distance=>Math.round(distance+seg*0.0001*moment.duration(currentTime).asSeconds()))
        /*if (endPosition >= -100) {
          setUp(false)
        }*/
      } else {
       endPosition < -118 ? setUp(true) : setSeg(seg => seg-7)
        const nend = endPosition - 10;
        setSPosition(endPosition)
        setEPosition(nend)
       setVitesses([...vitesses,seg])
       setInclinaison([...inclinaison,1])
       setEnergie(energie=>energie+100)
       setDistance(distance=>distance+10)
       setAngle(nend)
       /* if (endPosition <= -130) {
          setUp(true);
        }*/
      }
  }
  //déclenchement de l'animation du compteur à l'ouverture de la page
  React.useEffect(()=> {
    StartImageRotateFunction()
    const  interval = setInterval(() => {
     randomRotation()
    }, 900); //mise à jour du tableau d'interpolation de la rotation, toutes les 6s
    if (modal == true){
      clearInterval(interval)
    }
    return() =>{
      clearInterval(interval)
    }
  },[seg,endPosition,startPosition,angle,up,modal])

  //fonction animation aiguille
  const StartImageRotateFunction = () => {
    rotateValueHolder.setValue(startPosition)//définition de la position de départ pour l'animation
    Animated.timing(rotateValueHolder, {
      toValue: endPosition,
      Easing: 'linear',
      duration: 900,
    }).start(); // animation de la rotation
  }

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
          onPress: () => {
            //console.log(vitesses)
            if(defisValid.length > 0){
              saveSession()
            }
            //ws.close()

            goTo(props)
          },
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
     /*if (defis[defic].long !== undefined){

     }*/
     setDefic(defic => defic+1)
   }
   async function getDefiLong() {
     let tab = []
     for (let i = 0; i < state.user.defisLongs.length;i++)
     {
       const defi = await getDefi(state.token,state.user.defisLongs[i])
       if(defi.message){
         Alert.alert('Erreur serveur', defi.message);
       } else {
         tab.push(defi.defi)
       }
     }
     setDefis([...defis,...tab])
   }
   function showWarning(){
       if (t<0){
         setModal(false)
         setT(15)
       } else {
         setT(t--)
       }
   }
   function testWbSckt(){
     //const ws = new WebSocket("ws://localhost:8100");
       ws.onopen = () => {
         ws.send(`{"type":"text","content":"Bonjour"}`);
       }
     ws.onclose = (e) =>{
       console.log(e.code,e.reason);
       console.log("déconnecter")
     }
     ws.onmessage = (e) => {
       console.log(e.data)
       var message = JSON.parse(e.data)
       if (message.code !== undefined){
         switch (message.code){
           case 1:
             console.log(message)
             break;
           case 2:
             setErreur(message.msg)
               //ws.close()
             break;
         }
       }
     }
     ws.onerror = (e) => {
       console.log(e.message)
     }
   }
   function socketServer(){
     let config;
     if (Platform.OS == 'ios'){
       config ={
         port: 8080,
         host: '127.0.0.1',
         localAddress:  '127.0.0.1',
         reuseAddress: true
       }
     } else {
       config = {
         port: 8080,
         host: '10.0.2.2',
         reuseAddress: true
       }
     }
     try {
       server.connect(config,
           () => {
             server.write('{"code":0,"msg":"Bonjour"}');
           });
       server.on('data', (data) => {
         //console.log(data.toString('utf-8'))
         let s = JSON.parse(data.toString('utf-8'))
         console.log(s);
         if (s.temp !== undefined && s.temp > 35) {
           setErreur("Attention surchauffe détectée, veuillez cesser de pédaler")
           setStyleModal(styles.dangerModal)
           setModal(true)
           toggleStopwatch()
         }
       });
       server.on('error',(error)=>{
         console.log(error)
       })
       setServer(server)
     } catch (e){
       console.log(e)
     }
     /*server.onmessage = () => {
       console.log(e.data)
       var message = JSON.parse(e.data)
       if (message.code !== undefined){
         switch (message.code){
           case 1:
             console.log(message)
             break;
           case 2:
             setErreur(message.msg)
             //ws.close()
             break;
         }
       }
     }*/
   }
   React.useEffect(() =>{
     if (defis[defic] !== undefined)
     {
       if (defis[defic].long === undefined){
         if ((defis[defic].butUnit === "m" && distance >= defis[defic].butNumber)
             || (defis[defic].butUnit === "watts" && energie >= defis[defic].butNumber) )
         {
           ValiderDefis()
         }
       } else {
         if ((defis[defic].butUnit === "m" && state.user.totalDistance+distance >= defis[defic].butNumber)
             || (defis[defic].butUnit === "watts" && state.user.totalEnergie+energie >= defis[defic].butNumber) )
         {
           ValiderDefis()
         }
       }
    }
     //saveSession()
   },[distance,energie])
  React.useEffect(()=>{
    getDefiLong()
    //testWbSckt()
    socketServer()
  },[])

 React.useEffect(()=>{
   if (modal == false) {
     clearInterval(timeModal)
     setT(15)
   }
 },[modal])

  function readData(message){
     switch (message.code){
       case 0:
         let content = message.msg
         let vitesse = content.rp*(3/25)*Math.PI*0.622 // vitesse linéaire pour un rayon de 622mm (roue 26")
         let ps = content.US*content.IS //puissance en sortie de génératrice
         let pu = rp*(Math.PI/30)*735*50 //puissance développée par le pédalier pour un couple de 50Nm converti en watts
         let pe = content.UE*content.IE //puissance demandée à la génératrice
         let temp = content.temp //température du capteur
         if (temp >= 35){
           setStyleModal(styles.dangerModal)
           setErreur("Attention surchauffe détectée, veuillez cesser de pédaler")
           setModal(true)
         }
     }
  }
  //testWbSckt("bonjour")
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/fond.png')} style={styles.fond} />
        <ModalError styleModal={styleModal} erreur={erreur} setModal={setModal} modal={modal} t={t} nav={props} setT={setT} />
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
            <TouchableOpacity onPress={() => {
              server.write('{"code":2,"msg":"Un problème a été détecté. Veuillez cessez de pédaler ."}')
              //ws.send('{"code":2,"msg":"Un problème a été détecté. Veuillez cessez de pédaler ."}')
              setStyleModal(styles.dangerModal)
              setModal(true)
              toggleStopwatch()
              /*NotificationSounds.getNotifications('notification').then(soundsList  => {
                console.warn('SOUNDS', JSON.stringify(soundsList[1]));
                /*
                Play the notification sound.
                pass the complete sound object.
                This function can be used for playing the sample sound

                playSampleSound(soundsList[1]);
                // if you want to stop any playing sound just call:
                // stopSampleSound();
              });*/
            }} >
              <Text style={styles.midText}> error</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              server.write('{"code":2,"msg":"Attention, votre rythme ne permet pas de ' +
                  'produire la puissance que vous demandez. ' +
                  'Adaptez votre allure ou réduisez la puissance demandée."}')
              /*ws.send('{"code":2,"msg":"Attention, votre rythme ne permet pas de ' +
                  'produire la puissance que vous demandez. ' +
                  'Adaptez votre allure ou réduisez la puissance demandée."}')*/
              setStyleModal(styles.warningModal)
              setModal(true)
              const timer = setInterval(showWarning, 500)
              setTimeModal(timer)
            }} >
              <Text style={styles.midText}> error 2</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
            <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
        ) : (
        <View style={styles.middle}>
          <ImageBackground
            source={require('../../assets/Compteur/compteur.png')}
            style={styles.compteur}>
            <Animated.Image
              source={require('../../assets/Compteur/aiguille.png')}
              style={[{transform: [{rotate: rotation}]}, styles.aiguille]}
            />
            <AfficheurCompteur style={styles.graph} i={seg} />
            <AfficheurDonnees kmh={seg} energie={energie} distance={distance} cumulD={state.user.totalDistance}/>
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
                  ws.send(`{"code":3,"watts":${watts}}`)
                }}>
              <Text
                  style={[styles.midText, {fontSize: 70, marginRight: '5%', marginTop:25}]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View> )}
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
  dangerModal:{
    backgroundColor:"#FF0000AA",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  warningModal:{
    top:"28%",
    marginLeft:"10%",
    width:"75%",
    backgroundColor:"#FFED50AA",
    justifyContent:"flex-start",
    height:"20%",
    alignItems:"center",
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
    top: 30,
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
    top: 7,
    left: 55,
    width: 400,
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
