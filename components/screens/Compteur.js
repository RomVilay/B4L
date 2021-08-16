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

import AfficheurCompteur from './afficheurCompteur';
import AfficheurDonnees from "./afficheurDonnees";

import SliderDefis from "./sliderDefis";
import {createSession, editSession} from '../../functions/session';
import {editUser} from '../../functions/user';
import {getDefi} from '../../functions/defis';

import {Context} from "../utils/Store";
import goTo from '../utils/navFunctions';
import {ModalError} from './modalError'
import TcpSocket from 'react-native-tcp-socket';
import {LogBox} from 'react-native';
import RNLocalize from 'react-native-localize'
import DeviceInfo from "react-native-device-info";

import NotificationSounds, {playSampleSound} from 'react-native-notification-sounds'

export default function Compteur(props) {
    const [state, setState] = useContext(Context);
    const [modal, setModal] = useState(false)                                  //affichage du modal (défaut: caché)
    const [isLoading, setIsLoading] = useState(false);
    //variables pause timer
    const [start, setStart] = React.useState(true)
    const [reset, setReset] = React.useState(false)
    const [pause, setPause] = React.useState('')
    const [currentTime, setCTime] = React.useState('')
    //variables animation
    const rotateValueHolder = React.useRef(new Animated.Value(0)).current;         //initalisation de la valeur de rotation
    const [startPosition, setSPosition] = React.useState(0)//-160)                 //position initiale de l'image
    const [endPosition, setEPosition] = React.useState(2)//-125)                   //position finale de la première itération
    const outputRange = ['-160deg', '120deg']                                                //écart entre chaque rotation
    const [seg, setSeg] = React.useState(10)                                   //nombre de segment affichés pour l'animation du cercle
    const [angle, setAngle] = React.useState(-150)                             // angle de rotation initial
    const [up, setUp] = React.useState(true)                                   // simulation: augmente ou diminue la vitesse
    const [defis, setDefis] = React.useState(props.route.params.defis)                   // tableau des défis choisis
    const [defisValid, setDefisValid] = React.useState([])                     // tableaux des défis réalisés
    const [defic, setDefic] = React.useState(0)                                // numéro du défis courant
    const [watts, setWatts] = React.useState(200)                              // puissance demandée
    const [vitesses, setVitesses] = React.useState([0])                        // relevés de vitesse
    const [inclinaison, setInclinaison] = React.useState([])                   // relevés inclinaison
    const [energie, setEnergie] = React.useState([0])                          // relevés énergie produite
    const [distance, setDistance] = React.useState(0)                          // cumul de distance pour la session
    const [erreur, setErreur] = React.useState([0, 0])                         // tableau pour une erreur [titre, message]
    const [session, setSession] = React.useState()                                       // copie de la session actuelle
    const [styleModal, setStyleModal] = React.useState(styles.dangerModal)               // style d'erreur à afficher (dangerModal,warningModal)
    let [t, setT] = React.useState(15)                                         // timer pour l'écoulement de la barre de chargement
    const [timeModal, setTimeModal] = React.useState()                                   // timer pour l'affichage d'une modale
    const [server, setServer] = React.useState(new TcpSocket.Socket());                  // initialisation de la variable du socket
    const [donnees, setDonnees] = React.useState()                                       // données renvoyées par la carte
    const [energiep, setenergiep] = React.useState([])                         // énergie théorique nécessaire pour que l'utilisateur valide un défis de pente
    const [inc,setInc] = React.useState(0)
    const [lastMessage, setLastMessage] = React.useState('')
    const [tmsg,setTmsg] = React.useState()
    const [rpm,setRpm] = React.useState(0)
    require('node-libs-react-native/globals');
    var cons =new Buffer.from([
        0xFF,0xFF,0xFF,0xFF, //consigne
        0x01,       //force charge
        0x00,       //shutdown amp
        0x00,       //alimentation usb
        0x00,       //led 1
        0x00,       //led 2
        0x00,       //led 3
        0x00,       //buzzer
        0x00       //spare
    ])

    var releves = new Buffer.from([
        0x00,0x00,0x00,0x01,                     //température auxilliaire 4 octets 32
        0x00,0x00,0x00,0x01,                     //température puissance

        0x00,0x00,0x00,0x01,                     //frequence génératrice (Hz) (sert pour la vitesse)
        0x00,0x00,0x00,0x01,                     //courant génératrice (A)
        0x00,0x00,0x00,0x01,                     //tension génératrice (V)

        0x00,0x00,0x00,0x01,                     //frequence secteur (H)
        0x00,0x00,0x00,0x01,                     //courant secteur (A)
        0x00,0x00,0x00,0x01,                     //tension secteur (V)

        0x00,0x00,0x00,0x01,                     // entrée analog auxilliaire
        0x00,0x00,0x00,0x01,                    //dernière consigne d'injection

        0x03,                          //entrée tor 1
        0x00,                          //entrée tor 2
        0x01,                          //entrée tor 3
        0x00,                          //entrée tor 4
        0x00,                          //force charge
        0x00,                          //alarme de surtention
        0x00,                          //état de l'amplification
        0x00,                          //état usb 1
        0x00,                          //erreur usb
        0x00,                          //couleur led 1
        0x00,                          //couleur led 2
        0x07,                          //couleur led 3
        0x00,                          //état buzzer
        0x00,                          //erreur à définir
        0x00,                          //spare 1
        0x00])                        //spare2
    releves.writeFloatBE(20, 0) //température auxilliaire 4 octets 32
    releves.writeFloatBE(20, 4)

    releves.writeFloatBE(0, 8)
    releves.writeFloatBE(1, 12)
    releves.writeFloatBE(1, 16)

    releves.writeFloatBE(40, 20)
    releves.writeFloatBE(0, 24)
    releves.writeFloatBE(0, 28)

    releves.writeFloatBE(0, 32)
    releves.writeFloatBE(1, 36)
    releves.writeUInt8(0,46) // alerte surtensions

    React.useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])



    /**
     * fonction de démarrage/arrêt du minuteur
     */
    const toggleStopwatch = () => {
        setStart(!start)
        setReset(false)
        pause === ''
            ? setPause('Pause')
            : setPause('');
    }
    /**
     * fonction de remise à zero minuteur
     */
    const resetStopwatch = () => {
        setStart(false)
        setReset(true)
    }
    /**
     * fonction de sauvegarde de la session
     * @param : defis, vitesse, inclinaison, idUtilisateur,dateSession,dureeSession,distance,energie
     */
    const saveSession = async () => {
        if (defisValid.length >= 0) {
            const data = {
                "defis": defisValid.map(defi => defi._id),
                "vitesse": vitesses,
                "inclinaison": inclinaison,
                "idUser": state.user._id,
                "dateSession": moment(),
                "dureeSession": moment.duration(currentTime).asSeconds(),
                "distance": distance * 1000,
                "energie": energie.reduce((a, b) => a + b),
            }
            if (session == undefined) { //initialisation de la session
                const s = await createSession(data, state.token)
                if (s.message) {
                    Alert.alert('Erreur création session', s.message);
                    console.log(s.message)
                } else {
                    setSession(s)
                }
            } else { //mise à jour de la session
                const s = await editSession(session._id, data, state.token)
                if (s.message) {
                    Alert.alert('Erreur session', s.message);
                    console.log(s.message)
                } else {
                    setSession(s)
                }
            }
            let tab = defisValid.filter(defi => defi.long !== undefined).map(defi => defi._id) //copie des id des défis longs validés
            const userdata = {
                "totalDuree": state.user.totalDuree + moment.duration(currentTime).asSeconds(),
                "totalEnergie": isNaN(state.user.totalEnergie + energie.reduce((a, b) => a + b)) ? 1 : state.user.totalEnergie + energie.reduce((a, b) => a + b),
                "totalDistance": state.user.totalDistance + distance,
                "totalPoints": defisValid.length > 0 ?
                    Math.round(defisValid.map(defi => defi.points).reduce((a, b) => a + b) + state.user.totalPoints) : state.user.totalPoints,
                "pma": state.user.pma ? Math.round((energie.reduce((a, b) => a + b) / energie.length) + state.user.pma / 2 ): ((energie.reduce((a, b) => a + b) / energie.length) + 250) / 2
            }
            // defis longs : console.log(tab.length+" - "+tab.length > 0 ? defisValid.filter(defi => defi.long !== undefined).map(defi=>defi._id) : state.user.defisLongs)
            //mise à jour de l'utilisateur ( distance parcourue, points, energie produite, temps passé )
            const updated = await editUser(state.user.username, userdata, state.token)
            if (updated.message) {
                Alert.alert('Erreur update', updated.message);
                console.log(updated.message)
            } else {
                setState({user: updated, token: state.token})
            }
        }
    }

    //fonction qui défini la rotation à effectuer pour l'animation
    function randomRotation() {

        var freqRotation = Math.round(Math.random() * (70 - 20 + 1)) + 20                    //  random rotation mode serveur
        console.log(`rotation random : ${rotation} km/h`)
        var nend;                                                                               //nouvelle position finale de la rotation
        var nseg =  vitesses[vitesses.length-1]/135 * 200                                       // nouveau nombre de segments
        if (up) {
            if (vitesses[vitesses.length-2] > vitesses[vitesses.length-1]) {//seg >= 31) {//vitesses[vitesses.length-2] > vitesses[vitesses.length-1]) {
                setUp(false)
            }
            /*if ( vitesses.length > 2){
                nend = endPosition + ((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120) - 160
            } else {*/
                nend =  vitesses[vitesses.length-1]//endPosition + 10
            //}
             //((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 160
           // console.log(nend)
            setEPosition(nend)
            setSPosition(endPosition)
            setAngle(nend)
            /*if (vitesses.length > 0 && vitesses[vitesses.length-2] < vitesses [vitesses.length-1]){
                let variation = (vitesses[vitesses.length-1]/180) * 200 - seg
                setSeg(seg + Math.round(v))
                console.log("seg: "+seg)
            }*/
            //RotationVitesse()
            //sendMessage(1, `{"rg":${seg * 2.6525}}`)
            //setVitesses([...vitesses,seg])
            console.log(`segments : ${Math.round(nseg > 200 ? 200 : isNaN(nseg)? seg : nseg < 0 ? seg: nseg)}`) //définition des segments pour une vitesse supérieur à celle précédente
            setSeg(seg => Math.round(nseg > 200 ? 200 : isNaN(nseg)? seg : nseg < 0 ? seg: nseg) )
            //setEnergie([...energie, 100 + seg])
            releves.writeFloatBE( freqRotation /*40 +seg*/ , 8) //freqence de rotation de la géné
            releves.writeFloatBE(10, 12)
            releves.writeFloatBE(25, 16) // tension génératrice
            sendMessage(1, releves,0,inc )
            /*setInclinaison([...inclinaison,1])
            setEnergie([...energie,100])
            sendMessage(1,`{"US":10,"IS":20}`)
            sendMessage(1,`{"Temp":25}`)*/
        } else {
            if (vitesses[vitesses.length-2] < vitesses[vitesses.length-1]){//seg < 0){//vitesses[vitesses.length-2] < vitesses[vitesses.length-1]) {
                setUp(true)
            }
            nend = vitesses[vitesses.length-1] //endPosition - 10 //(seg/200) * 180 - 140;
            setSPosition(endPosition)
            setEPosition(nend)
            setAngle(nend)
            //setTimeout(()=>{setSeg(seg => seg-7)},500)
            //setVitesses([...vitesses,seg])
            //sendMessage(1, `{"rg":${seg * 2.6525}}`)
            //setEnergie([...energie, 100 - seg])
            console.log(`segments : ${Math.round(nseg < 0 || isNaN(nseg)  ? 0 : nseg)}`) // définition des segements pour une vitesse inférieure à la précédente
            setSeg(seg => Math.round(nseg < 0 || isNaN(nseg)  ? 0 : nseg))//- 7) //
            releves.writeFloatBE(freqRotation , 8)
            releves.writeFloatBE(10, 12)
            releves.writeFloatBE(25 , 16) //
            sendMessage(1, releves,0,inc )
            //setInclinaison([...inclinaison,1])
            /* calcul segment / vitesse
            if (vitesses.length > 0 && vitesses[vitesses.length-2] > vitesses [vitesses.length-1]){
                 let variation = seg - (vitesses[vitesses.length-1]/180) * 200
                 setSeg(seg - Math.round(v))
               console.log("seg: "+seg)
             }
           //sendMessage(1,`{"US":10,"IS":20}`)
           //sendMessage(1,`{"rg":${seg*2.6525},"US":10,"IS":20,"Temp":25}`)
           //sendMessage(1,`{"Temp":25}`)
           */
            /* if (endPosition <= -130) {
               setUp(true);
             }*/
        }
    }

    const RotationVitesse = () => {
        var diff = vitesses.length >= 2 ? vitesses[vitesses.length - 2] - vitesses[vitesses.length - 1] : vitesses[vitesses.length - 1]
        var ang = endPosition + diff * 3.5;
        //setSPosition(endPosition)
        //setEPosition(ang)
        //setAngle(ang)
        //setSeg(seg + (diff/180)*200)
        //console.log(`différence: ${Math.round(diff)} km/h - angle de rotation : ${ang}`)//`seg: ${seg * (10 / 7)} - ang : ${ang} - vitesse : ${vitesses.length} - v1: ${vitesses[vitesses.length - 1]}`)
    }

    //déclenchement de l'animation du compteur à l'ouverture de la page
    React.useEffect(() => {
        StartImageRotateFunction()
        const interval = setInterval(() => {
            randomRotation()
        }, 1000); //mise à jour du tableau d'interpolation de la rotation
        if (modal == true || start == false) {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [seg, endPosition, startPosition, angle, up, modal,vitesses])

    //fonction animation aiguille
    const StartImageRotateFunction = () => {
        rotateValueHolder.setValue(startPosition)       //définition de la position de départ pour l'animation
        Animated.timing(rotateValueHolder, {
            toValue: endPosition,
            Easing: 'linear',
            duration: 300,
        }).start(); // animation de la rotation
    }

    /**
     * fonction d'arrêt de session
     * enregistre la session actuelle
     * et envoie le signal de fin à la génératrice
     * @constructor
     */
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
                        if (defisValid.length > 0) {
                            saveSession()
                        }
                        stopSession(watts)
                    },
                },
            ],
            {cancelable: false},
        );
    //définition du tableau d'interpolation pour la première rotation
    const rotation = rotateValueHolder.interpolate({
        inputRange: [0, 100],
        outputRange: outputRange,
    });

    //définition des positions pour les différentes valeurs

    /**
     * fonction de validation des défis
     * utilise la ou les objectifs de chaque défis (distance en m, énergie en w, inclinaison en % et durée en s)
     * @constructor
     */
    function ValiderDefis() {
        //faire calcul défis de pente
        var defi = defis[defic]
        //console.log(defi.buts)
        //var incli = (energie.reduce((a,b) => a+b) / energie.length) / (state.user.poids * 9.81 * vitesses[vitesses.length-1])
        var bvalid = 0
        if (defi !== undefined) {
            if (energie.length > 0) {
                var ratioEffort = state.user.pma ? (energie.reduce((a, b) => a + b) / energie.length) / state.user.pma : (energie.reduce((a, b) => a + b) / energie.length) / 250 //bonus d'effort
                if (ratioEffort > 0.5) {
                    ratioEffort > 0.75 ? defi.points = defi.points + defi.points * (ratioEffort - 0.5) : defi.points = defi.points + defi.points * (ratioEffort - 0.25)
                }
            }
            for (var i = 0; i < defi.buts.length; i++) {
                var but = defi.buts[i]
                if (defi.long === undefined) {
                    if ((but.unit === "m" && distance * 1000 >= but.number)
                        || (but.unit === "watts" && energie.length > 0 && energie.reduce((a, b) => a + b) >= but.number)
                        || (but.unit === "secondes" && moment.duration(currentTime).asSeconds() - defi.startTime === but.number)
                        || (but.unit === "%" && energie.length > 0 && energiep.length > 0 && defi.startE !== null && (energie.reduce((a, b) => a + b) - defi.startE >= energiep.reduce((a, b) => a + b) - defi.startE))
                    ) {
                        bvalid = bvalid + 1
                    }
                    if (but.unit === "%") {                                              //cas des défis de pentes an fonction de la durée écoulée
                        var v = vitesses[vitesses.length - 1]//vitesses.reduce((sum,item)=>sum+item) / vitesses.length
                        if (defi.startE === undefined) {
                            defis[defic].startE = energie.reduce((a, b) => a + b)
                            setDefis(defis)
                        } else {
                            var pth = v * state.user.poids * 9.81 * but.number * 0.6           //calcul de la force à demander à l'utilisateur, en fonction de sa vitesse actuelle
                            console.log(v + " - " + pth)
                            //sendMessage(3,`{"watts":${pth}}`)
                            setWatts(Math.round(pth))
                            setenergiep([...energiep, pth])
                        }
                    }
                } else {
                    //validation des défis longs
                    if ((but.unit === "m" && state.user.totalDistance + distance >= but.number)
                        || (but.unit === "watts" && state.user.totalEnergie + energie >= but.number)
                        || (but.unit === "secondes" && moment.duration(currentTime).asSeconds())) {
                        bvalid = bvalid + 1

                    }
                }
            }
            if (bvalid === defis[defic].buts.length) {
                setDefisValid([...defisValid, defi])
                if (defis.length > defic) {
                    setDefic(defic => defic + 1)
                    defis[defic].startTime = moment.duration(currentTime).asSeconds()
                    setDefis(defis)
                }
                //
            }
        }
    }

    /**
     * fonction de réccupération des défis longs  de l'utilisateur
     * @returns {Promise<void>} ajoute la liste des défis long aux défis de la session
     */
    async function getDefiLong() {
        let tab = []
        for (let i = 0; i < state.user.defisLongs.length; i++) {
            const defi = await getDefi(state.token, state.user.defisLongs[i])
            if (defi.message) {
                Alert.alert('Erreur serveur', defi.message);
            } else {
                tab.push(defi.defi)
            }
        }
        setDefis([...defis, ...tab])
    }

    /**
     * fonction d'affichage avec un délais de 15 secondes d'un message
     */
    function showWarning() {
        if (t < 0) {
            setModal(false)
            setT(15)
        } else {
            setT(t--)
        }
    }

    //checksum 16 bits pour le header et les datas socket
    function crc16(buffer, start, end) {
        var crc = 0xFFFF;
        var odd;
        if (buffer.length <= end)
            return 0;
        for (var i = start; i < end; i++) {
            crc = crc ^ buffer.readUInt8(i);
            for (var j = 0; j < 8; j++) {
                odd = crc & 0x0001;
                crc = crc >> 1;
                if (odd) {
                    crc = crc ^ 0xA001;
                }
            }
        }
        return crc;
    };

    /**
     * fonction d'envoi des messages à la carte
     * @param type type de message (1 : réception de données, 2: erreurs, 3: consigne)
     * @param msg contenu du message ("watts : x", "US:x,IS:y...","erreur:déconnection du réseau")
     */
    async function sendMessage(type, msg, cr, inc) {
        let contenu = new Buffer.from(msg)
        let head = Buffer.alloc(12+contenu.length+2);                          // buffer header message
        head.writeUInt16BE(0xA55A,0)                                    // flag
        head.writeUInt16BE(inc, 2)                                            //request id incrément pas incrémenté
        head.writeUInt16BE(type, 4)                                           //ID / type de message
        head.writeUInt16BE(contenu.length+1, 6)                         //longueur du contenu message 16bits
        head.writeUInt16BE(cr,8)                                              // compte rendu
        head.writeUInt16BE(crc16(head, 2, 10), 10)                  //checksum header 16 bits
        if (contenu.length > 0 ) {
            head.fill(contenu, 12, 12 + contenu.length)
            head.writeUInt16LE(crc16(head, 12, 12 + contenu.length-1 ), head.length - 3)
            //setLastmessage(head)
            //console.log(head)
            server.write("")
            server.write(head)
        } else {
            setLastmessage(head)
            server.write("")
            server.write(head)
        }
    }

    /**
     * fonction qui envoie des valeurs de puissance afin de libérer progressivement la génératrice
     * @param w puissance de consigne actuelle
     */
    function stopSession(w) {
        //setWatts(watts - 50 )
        setErreur(["Fin de Session", "Ralentissez progressivement avant la fin de la session."])
        setStyleModal(styles.endingModal)
        /*server.destroy()
        goTo(props)*/
         setModal(true)
         console.log(erreur[0])
         const timer = setInterval(showWarning, 1250)
         setTimeModal(timer)
            let t = setInterval(()=>{
              if (w <= 2){
                w=0
                cons.writeFloatBE(w,0)
                cons.writeUInt8(0,7) //led 1 éteinte
                cons.writeUInt8(0,8) // led 2 éteinte
                cons.writeUInt8(0,9) // led 3 éteinte
                sendMessage(5, cons,0,inc )
                console.log("end")
                clearInterval(t)
                server.destroy()
                goTo(props)
          }
          else{
            w=w-Math.round(w*0.20)
            cons.writeFloatBE(w,0)
            sendMessage(5, cons,0,inc )
            console.log(w)
          }
        },1000)
    }

    /**
     * fonction d'initialisation du socket tcp
     */
    async function socketServer() {
        let config = await DeviceInfo.isEmulator()
            .then((status) => {
            if (status) {                                //configuration simulateur
                if (Platform.OS == 'ios') {              //configuration iphone
                    return  config = {
                        port: 8080,
                        host: '127.0.0.1',
                        localAddress: '127.0.0.1',
                        reuseAddress: true,
                    }
                } else {                                //configuration android device
                    return config = {
                        port: 8080,
                        host: '10.0.2.2',
                        reuseAddress: true
                    }
                }
            } else {
                if (Platform.OS == 'ios') {             //configuration iphone
                    return config = {
                        port: 8080,
                        host: '192.168.5.2',
                        localAddress: '127.0.0.1',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                } else {                                //configuration android device
                    return config = {
                        port: 8080,
                        host: '192.168.5.2',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                }
            }
        })
        console.log(config)
        try {
            server.connect(config,
                () => {
                    //envoi d'une première consigne
                    cons.writeFloatBE(watts,0)
                    cons.writeUInt8(2,7) //led 1 vert
                    cons.writeUInt8(2,8) // led 2 vert
                    cons.writeUInt8(2,9) // led 3 vert
                    sendMessage(5, cons,0,inc )
                });
            server.on('data', (data) => {
                //traitement des données renvoyées par la carte
                setDonnees(data)
            });
            server.on('error', (error) => {
                // traitement des erreurs en provenance du socket, affichage dans la console et sur le mobile
                console.log("server error: " + error)
                setErreur(["erreur de connexion", error + ". Veuillez réessayer."])
                setStyleModal(styles.dangerModal)
                setModal(true)
            })
            setServer(server)
        } catch (e) {
            console.log("erreur :" + e)
        }
    }

    // validation et mise à jour des défis sélectionnés
    React.useEffect(() => {
        ValiderDefis()
        //saveSession()
    }, [distance, energie, defis])
    // réccupération des défis longs
    React.useEffect(() => {
        getDefiLong()
        //testWbSckt()
        socketServer()
        defis[defic].startTime = 0
        setDefis(defis)
    }, [])
    React.useEffect(() => {
        if (defis[defic] !== undefined) {
            defis[defic].startTime = moment.duration(currentTime).asSeconds()
            setDefis(defis)
        }
    }, [defic])

    React.useEffect(() => {
        if (modal == false) {
            clearInterval(timeModal)
            setT(15)
        }
    }, [modal])
    React.useEffect(
        () => {
            if (donnees !== undefined) {
                readData(donnees)
                //RotationVitesse()
            }
        }, [donnees]
    )

    /**
     * fonction de lecture des données de la carte
     * @param messsage données en provenance de la carte, type de message 1
     * @set vitesses/rpm/energie produite
     */
    function readData(message) {
        //console.log(message)
        //console.log(message.toString('hex'))
        const checksumhead = message.readUInt16BE(10) === crc16(message,0,10)
        const checksumcontent = crc16(message, 12, 12 + message.readUInt16BE(6) - 1 ) === message.readUInt16BE(message.length - 3) // pas fini
        /* if (checksumhead){
             sendMessage(message.readUInt16BE(4)+1,"",1,message.readUInt16BE(2))
         }*/
        //if (!checksumhead && !checksumcontent)  {
        setInc(message.readUInt16BE(2))
        //sendMessage(2,"", 0, inc)
        //} else {
        var header = message.subarray(0,11)
        setInc(header.readUInt16BE(2))
        if (header.readUInt16BE(6) > 0){
            var contenu = message.subarray(12,message.length-3)
        }
        var type = header.readUInt16BE(4)
        console.log(header.readUInt16BE(4))
        //setDonnees(message)
        //relevés de la carte vers le mobile
           switch (type) {
               case 1:
                    //console.log(contenu.toString('hex'))
                    //console.log(contenu.readFloatBE(8))
                    var frequ = contenu.readFloatBE(8)
                    var vitesse = Math.PI*0.0007*(frequ*3600/18)// 36 = nb bobines
                    console.log( `vitesse : ${vitesse} - distance parcourue${(vitesse/3600)}`)
                    setDistance(dist => distance + (vitesse/3600) )
                    setRpm(Math.round((frequ*60)/(18*5)))
                    var puiss =  releves.readFloatBE(12) * releves.readFloatBE(16)
                    setEnergie([...energie, puiss])
                    console.log(`energie : ${puiss} - calories : ${puiss*0.239}`)
                    //console.log(`vitesse : ${vitesse}  - rpm: ${rpm}`)
                    setTimeout(() => {setVitesses([...vitesses,vitesse])}, 900)
                    console.log("type message: "+contenu.readFloatBE(8))
                    console.log(`tension génératrice = ${contenu.readFloatBE(16)}`)
                    console.log("angle: "+( ((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/100)*360 - 160 ) +" - "+ endPosition )
                    console.log("seg:"+( (vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/100 * 200 )+" - "+seg )
                    console.log(`alerte surt : ${contenu.readUInt8(46)} - temp aux : ${contenu.readFloatBE(0)} - temp gene: ${contenu.readFloatBE(4)}`)
                   if (contenu.readFloatBE(0) >= 30 || contenu.readFloatBE(4) >= 40  )
                   {
                       //saveSession()
                       //stopSession(watts)
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surchauffe détectée, veuillez cesser de pédaler"])
                       setModal(true)
                       //cons.writeUInt8(1,5) //coupure ampli
                       //cons.writeUInt8(4,7) //led 1 rouge
                   }
                   if (contenu.readUInt8(46) === 1) {
                       //saveSession()
                       //stopSession(watts)
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surtension dans le système, veuillez cesser de pédaler"])
                       setModal(true)
                       //console.log("alerte surtention - alerte surt"+ contenu.readUInt8(46))
                   }
                   if (contenu.readFloatBE(8) < 20 ){
                       setErreur(["Attention", "Votre rythme ne permet pas de produire la puissance que vous demandez. Adaptez votre allure ou réduisez la puissance demandée."])
                       setStyleModal(styles.warningModal)
                       setModal(true)
                       const timer = setInterval(showWarning, 500)
                       setTimeModal(timer)
                   }
                   /*if (contenu.readFloatBE(20) >+ contenu.readFloatBE(8) +0.05 || contenu.readFloatBE(20) <= contenu.readFloatBE(8)+ 0.05){
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention une différence de fréquence a été détectée dans le réseau électrique, veuillez cesser de pédaler"])
                       setModal(true)
                   }*/
                    /*setEPosition(((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 140)
                    setSPosition(endPosition)
                    setAngle(((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 140)*/
                   /* if (contenu.rg !== undefined) {
                        let vitesse = contenu.rg / 2.6525   //  * (3 / 25) * Math.PI * 0.622  vitesse linéaire pour un diamètre intérieur de 622mm (roue 29") à partir des rotations par minutes de la génératrice
                        setVitesses([...vitesses, vitesse])
                        let d = distance + vitesse * moment.duration(currentTime).asHours()
                        setDistance(d)
                    }
                    if (contenu.US !== undefined && contenu.IS !== undefined) {
                        let ps = contenu.US * contenu.IS //puissance en sortie de génératrice
                        setEnergie([...energie, ps])
                        //cas d'un défis de pente
                        /*if (defic.typeDefis == "pente") {
                            if (ps !== state.user.poids * defi.butNumber * vitesses[vitesses.length-1] * 9.81) {
                                    if (ps <= energie-10 || ps >= energie+10) {
                                        sendMessage(3, `watts: ${ps}`)
                                        setErreur(["Mode Defi Pente","Attention, vous avez choisi un défi pente," +
                                        " pendant la durée de ce défi vous ne pouvez pas modifier la puissance demandée."])
                                    }
                                //let i =  ps /state.user.poids * vitesses[vitesses.length-1] * 9.81  //prise en compte de l'inclinaison inclinaison = puissance totale / poids de l'utilisateur(kg) * sa vitesse (m/s) * gravité (9.81)
                            } else {
                                setInclinaison([...inclinaison,defi.butNumber])
                            }
                          }
                    }
                    if (contenu.temp !== undefined) {
                        let temp = contenu.temp //température du capteur
                        if (temp >= 35) {
                            setStyleModal(styles.dangerModal)
                            setErreur(["Erreur", "Attention surchauffe détectée, veuillez cesser de pédaler"])
                            setModal(true)
                        }
                    }*/
                    break;
                case 2:
                   //console.log(contenu.toString('hex'))
                   //console.log(contenu.readFloatBE(8))
                   var frequ = contenu.readFloatBE(8)
                   var vitesse = Math.PI*0.0007*(frequ*3600/18)// 36 = nb bobines
                   console.log( `vitesse : ${vitesse} - distance parcourue${(vitesse/3600)}`)
                   setDistance(dist => distance + (vitesse/3600) )
                   setRpm(Math.round((frequ*60)/(18*5)))
                   var puiss =  releves.readFloatBE(12) * releves.readFloatBE(16)
                   setEnergie([...energie, puiss])
                   console.log(`energie : ${puiss} - calories : ${puiss*0.239}`)
                   //console.log(`vitesse : ${vitesse}  - rpm: ${rpm}`)
                   setVitesses([...vitesses,vitesse])
                   console.log(contenu.readFloatBE(8))
                   console.log("angle: "+( ((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 160 ) +" - "+ endPosition )
                   console.log("seg:"+( (vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120 * 200 )+" - "+seg )
                   console.log(`alerte surt : ${contenu.readUInt8(46)} - temp aux : ${contenu.readFloatBE(0)} - temp gene: ${contenu.readFloatBE(4)}`)
                   if (contenu.readFloatBE(0) >= 30 || contenu.readFloatBE(4) >= 40  )
                   {
                       //saveSession()
                       //stopSession(watts)
                       cons.writeFloatBE(watts,0)
                       cons.writeUInt8(4,7) //led 1 rouge
                       cons.writeUInt8(4,8) // led 2 rouge
                       cons.writeUInt8(4,9) // led 3 éteinte
                       sendMessage(5, cons,0,inc )
                       stopSession(watts)
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surchauffe détectée, veuillez cesser de pédaler"])
                       setModal(true)
                       //cons.writeUInt8(1,5) //coupure ampli
                       //cons.writeUInt8(4,7) //led 1 rouge
                   }
                   if (contenu.readUInt8(46) === 1) {
                       //saveSession()
                       stopSession(watts)
                       cons.writeFloatBE(watts,0)
                       cons.writeUInt8(4,7) //led 1 rouge
                       cons.writeUInt8(4,8) // led 2 rouge
                       cons.writeUInt8(0,9) // led 3 éteinte
                       sendMessage(5, cons,0,inc )
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surtension dans le système, veuillez cesser de pédaler"])
                       setModal(true)
                       //console.log("alerte surtention - alerte surt"+ contenu.readUInt8(46))
                   }
                   if (contenu.readFloatBE(8) < 20 ){
                       cons.writeFloatBE(watts,0)
                       cons.writeUInt8(3,7) //led 1 jaune
                       cons.writeUInt8(0,8) // led 2 éteinte
                       cons.writeUInt8(0,9) // led 3 éteinte
                       sendMessage(5, cons,0,inc )
                       setErreur(["Attention", "Votre rythme ne permet pas de produire la puissance que vous demandez. Adaptez votre allure ou réduisez la puissance demandée."])
                       setStyleModal(styles.warningModal)
                       setModal(true)
                       const timer = setInterval(showWarning, 500)
                       setTimeModal(timer)
                       cons.writeFloatBE(watts,0)
                       cons.writeUInt8(2,7) // led 1 vert
                       cons.writeUInt8(2,8) // led 2 vert
                       cons.writeUInt8(2,9) // led 3 vert
                       sendMessage(5, cons,0,inc )
                   }
                   /*if (contenu.readFloatBE(20) >+ contenu.readFloatBE(8) +0.05 || contenu.readFloatBE(20) <= contenu.readFloatBE(8)+ 0.05){
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention une différence de fréquence a été détectée dans le réseau électrique, veuillez cesser de pédaler"])
                       setModal(true)
                   }*/
                   /*setEPosition(((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 140)
                   setSPosition(endPosition)
                   setAngle(((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 140)*/
                   /* if (contenu.rg !== undefined) {
                        let vitesse = contenu.rg / 2.6525   //  * (3 / 25) * Math.PI * 0.622  vitesse linéaire pour un diamètre intérieur de 622mm (roue 29") à partir des rotations par minutes de la génératrice
                        setVitesses([...vitesses, vitesse])
                        let d = distance + vitesse * moment.duration(currentTime).asHours()
                        setDistance(d)
                    }
                    if (contenu.US !== undefined && contenu.IS !== undefined) {
                        let ps = contenu.US * contenu.IS //puissance en sortie de génératrice
                        setEnergie([...energie, ps])
                        //cas d'un défis de pente
                        /*if (defic.typeDefis == "pente") {
                            if (ps !== state.user.poids * defi.butNumber * vitesses[vitesses.length-1] * 9.81) {
                                    if (ps <= energie-10 || ps >= energie+10) {
                                        sendMessage(3, `watts: ${ps}`)
                                        setErreur(["Mode Defi Pente","Attention, vous avez choisi un défi pente," +
                                        " pendant la durée de ce défi vous ne pouvez pas modifier la puissance demandée."])
                                    }
                                //let i =  ps /state.user.poids * vitesses[vitesses.length-1] * 9.81  //prise en compte de l'inclinaison inclinaison = puissance totale / poids de l'utilisateur(kg) * sa vitesse (m/s) * gravité (9.81)
                            } else {
                                setInclinaison([...inclinaison,defi.butNumber])
                            }
                          }
                    }
                    if (contenu.temp !== undefined) {
                        let temp = contenu.temp //température du capteur
                        if (temp >= 35) {
                            setStyleModal(styles.dangerModal)
                            setErreur(["Erreur", "Attention surchauffe détectée, veuillez cesser de pédaler"])
                            setModal(true)
                        }
                    }*/
                   break;
                case 5: //consigne du mobile vers la carte
                   console.log(`consigne: ${contenu.readFloatBE(0)} - force charge : ${contenu.toString('hex',4,5)} 
                    - shutdown :${contenu.toString('hex',5,6)} - etat usb :${contenu.toString('hex',6,7)} 
                    - led 1: ${contenu.toString('hex',7,8)} - led 2: ${contenu.toString('hex',8,9)} - led 3 : ${contenu.toString('hex',9,10)} 
                    - buzzer: ${contenu.toString('hex',10,11)} - spare: ${contenu.toString('hex',11,contenu.length)} length : ${contenu.length}`)
                   break;
            }
            //console.log(`vitesse : ${vitesses[vitesses.length-1]}, energie : ${energie[energie.length-1]}, distance : ${distance}`)
    }

    //testWbSckt("bonjour")
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/fond.png')} style={styles.fond}/>
            <ModalError styleModal={styleModal} erreur={erreur} setModal={setModal} modal={modal} t={t} nav={props}
                        setT={setT} server={server}/>
            <View style={styles.header}>
                <LogoMin/>
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
                    <Icon name="power-settings-new" size={40} color="white"/>
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <SliderDefis defis={defis} defisV={defisValid} current={defic}/>
                    <TouchableOpacity onPress={() => {
                        //server.write('{"code":2,"msg":"Un problème a été détecté. Veuillez cessez de pédaler ."}')
                        setErreur(["Erreur", "Un problème a été détecté. Veuillez cessez de pédaler ."])
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
                    }}>
                        <Text style={styles.midText}> error</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        /*server.write('{"code":2,"msg":"Attention, votre rythme ne permet pas de ' +
                            'produire la puissance que vous demandez. ' +
                            'Adaptez votre allure ou réduisez la puissance demandée."}')
                        /*ws.send('{"code":2,"msg":"Attention, votre rythme ne permet pas de ' +
                            'produire la puissance que vous demandez. ' +
                            'Adaptez votre allure ou réduisez la puissance demandée."}')*/
                        setErreur(["Attention", "Votre rythme ne permet pas de produire la puissance que vous demandez. Adaptez votre allure ou réduisez la puissance demandée."])
                        setStyleModal(styles.warningModal)
                        setModal(true)
                        const timer = setInterval(showWarning, 500)
                        setTimeModal(timer)
                    }}>
                        <Text style={styles.midText}> error 2</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}}/>
            ) : (
                <View style={styles.middle}>
                    <ImageBackground
                        source={require('../../assets/Compteur/compteur.png')}
                        style={styles.compteur}>
                        <Animated.Image
                            source={require('../../assets/Compteur/aiguille.png')}
                            style={[{transform: [{rotate: rotation}]}, styles.aiguille]}
                        />
                        <AfficheurCompteur style={styles.graph} i={seg}/>
                        <AfficheurDonnees kmh={vitesses[vitesses.length - 1]} rpm={rpm} energie={energie[energie.length - 1]}
                                          distance={distance} cumulD={state.user.totalDistance}/>
                    </ImageBackground>
                    <View style={[{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: '25%',
                        marginTop: Platform.OS === "android" ? 0 : 0
                    }]}>
                        <TouchableOpacity onPress={() => {
                            if (watts > 0) {
                                //console.log(`{"watts":${watts-5}}`)
                                setWatts(watts - 5)
                                cons.writeFloatBE(watts-5,0)
                                //setConsigne(consigne)
                                sendMessage(5, cons,0,inc )
                                //sendMessage(3, `{"watts":${watts - 5}}`)
                                //sendWatts(watts)
                            }
                        }}>
                            <Text style={[styles.midText, {fontSize: 60, marginRight: '5%', marginTop: 30}]}> - </Text>
                        </TouchableOpacity>
                        <View style={[styles.textbloc, {marginTop: 30}]}>
                            <Text style={[styles.midText, {fontSize: 60, marginTop: 10}]}>
                                {' '}
                                {watts}{' '}
                            </Text>
                            <Text style={[styles.midText2]}>watts </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (watts < 750) {
                                    setWatts(watts + 5)
                                    cons.writeFloatBE(watts+5,0)
                                    //setConsigne(consigne)
                                    sendMessage(5, cons,0,inc )
                                    //sendMessage(3, `{"watts":${watts + 5}}`)
                                    //setWatts(watts + 5);
                                }
                            }}>
                            <Text
                                style={[styles.midText, {fontSize: 70, marginRight: '5%', marginTop: 25}]}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>)}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.midText2, {margin: '5%', zIndex: 600}]}
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
    dangerModal: {
        backgroundColor: "#FF0000AA",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    warningModal: {
        top: "28%",
        marginLeft: "10%",
        width: "75%",
        backgroundColor: "#FFED50AA",
        justifyContent: "flex-start",
        height: "20%",
        alignItems: "center",
    },
    endingModal: {
        marginTop: Platform.OS === "ios" ? "60%" : "30%",
        marginLeft: "10%",
        paddingTop: "5%",
        height: 170,
        width: "75%",
        backgroundColor: "#5FCDFAAA",
        justifyContent: "center",
        alignItems: "center"
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
        height: 400,
        width: 450,
        flex: 2,
        resizeMode: 'contain',
        justifyContent: 'center',
        right: 30,
        top: -50,
        zIndex: 0,
    },
    aiguille: {
        top: 80,
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
        top: 43,
        left: 67,
        width: 500,
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
