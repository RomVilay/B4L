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
import {createSequence, createSession, editSession, getSession} from '../../functions/session';
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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [startPosition, setSPosition] = React.useState(0)//-160)             //position initiale de l'image
    const [endPosition, setEPosition] = React.useState(2)//-125)               //position finale de la première itération
    const outputRange = ['-160deg', '120deg']                                            //écart entre chaque rotation
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
    const [sequences,setSequences] = React.useState([])
    const wattConverter = (nber) => {
        return (nber/750)*4095 }
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
    releves.writeUInt32BE(20, 0) //température auxilliaire 4 octets 32
    releves.writeUInt32BE(20, 4)

    releves.writeUInt32BE(0, 8)
    releves.writeUInt32BE(1, 12)
    releves.writeUInt32BE(1, 16)

    releves.writeUInt32BE(40, 20)
    releves.writeUInt32BE(0, 24)
    releves.writeUInt32BE(0, 28)

    releves.writeUInt32BE(0, 32)
    releves.writeUInt32BE(1, 36)
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
        console.log("save session")
        if (defisValid.length >= 0) {
            /*const data = {
                "defis": defisValid.map(defi => defi._id),
                "vitesse": vitesses,
                "inclinaison": inclinaison,
                "idUser": state.user._id,
                "dateSession": moment(),
                "dureeSession": moment.duration(currentTime).asSeconds(),
                "distance": distance * 1000,
                "energie": energie.reduce((a, b) => a + b),
            }*/
            if (session === undefined) { //initialisation de la session
                let data = {"user": {id:state.user.id}, "date":moment()}
                let newsession = await createSession(data, state.token)
                if (newsession.message) {
                    Alert.alert('Erreur création session', newsession.message);
                    console.log(newsession.message)
                } else {
                    //console.log(newsession)
                    setSession(newsession)
                }
            } else { //mise à jour de la session
                if (sequences.length > 0) {
                    console.log(sequences)
                    for (var sequence of sequences) {
                        console.log(sequence)
                        let s = await createSequence(sequence,state.token)
                        if (s.message) {
                            Alert.alert('Erreur update sequences', s.message);
                            console.log(s.message)
                        }
                         console.log(s)
                    }
                }
                setSequences([])
                if (defisValid.length > 0) {
                    let data = {
                        "challenges":defisValid
                    }
                    let updatesession = await editSession(session.id, data, state.token)
                    if (updatesession.message) {
                        Alert.alert('Erreur update session', updatesession.message);
                        console.log(updatesession.message)
                    }
                }
               // console.log(state.token)
                    let updatedSession = await getSession(session.id,state.token)
                    if (updatedSession.message) {
                        Alert.alert('Erreur get updated session', updatedSession.message);
                        console.log(updatedSession.message)
                    }
                    console.log(updatedSession)
                    setSession(updatedSession)
            }
            let tab = defisValid.filter(defi => defi.islong).map(defi => defi.id) //copie des id des défis longs validés
            let storedPassword = await AsyncStorage.getItem('@bikeforlifepassword');
            const userdata = {
               "challenges":tab,
               "password": storedPassword,
               "currentPassword":storedPassword
            }
            // defis longs : console.log(tab.length+" - "+tab.length > 0 ? defisValid.filter(defi => defi.long !== undefined).map(defi=>defi._id) : state.user.defisLongs)
            //mise à jour de l'utilisateur ( distance parcourue, points, energie produite, temps passé )
           /* const updated = await editUser(state.user.id, userdata, state.token)
            if (updated.message) {
                Alert.alert('Erreur update', updated.message);
                console.log(updated.message)
            } else {
                setState({user: updated, token: state.token})
            }*/
        }
    }
    /***
     * fonction de rotation de l'aiguille et d'animation des segments en parallèle
     */
    function randomRotation() {

        var freqRotation = Math.round(Math.random() * (70 - 20 + 1)) + 20                    //  random rotation mode serveur
        var nend;                                                                               //  nouvelle position finale de la rotation
        var nseg =  vitesses[vitesses.length-1]/135 * 200                                       //  nouveau nombre de segments
        if (up) {
            if (vitesses[vitesses.length-2] > vitesses[vitesses.length-1]) {
                setUp(false)
            }

                nend =  vitesses[vitesses.length-1]
            setEPosition(nend)
            setSPosition(endPosition)
            setAngle(nend)

            //définition des segments pour une vitesse supérieur à celle précédente

            setSeg(seg => Math.round(nseg > 200 ? 200 : isNaN(nseg)? seg : nseg < 0 ? seg: nseg) )
            releves.writeUInt32BE( freqRotation /*40 +seg*/ , 8) //freqence de rotation de la géné
            releves.writeUInt32BE(10, 12)
            releves.writeUInt32BE(25, 16) // tension génératrice
            sendMessage(1, releves,0,inc )
            /*setInclinaison([...inclinaison,1])*/
        } else {
            if (vitesses[vitesses.length-2] < vitesses[vitesses.length-1]){
                setUp(true)
            }
            nend = vitesses[vitesses.length-1] //endPosition - 10 //(seg/200) * 180 - 140;
            setSPosition(endPosition)
            setEPosition(nend)
            setAngle(nend)
            setSeg(seg => Math.round(nseg < 0 || isNaN(nseg)  ? 0 : nseg))//- 7) //
            releves.writeUInt32BE(freqRotation , 8)
            releves.writeUInt32BE(10, 12)
            releves.writeUInt32BE(25 , 16) //
            sendMessage(1, releves,0,inc )
        }
    }

    /**
     * lancement de l'animation du compteur
     *
     */
    React.useEffect(() => {
        StartImageRotateFunction()
        if (defis[defic].id !== "2187ed70-a005-4ae2-8fa6-5db2c2db907e") {
            const interval = setInterval(() => {
                randomRotation()
            }, 1000); //mise à jour du tableau d'interpolation de la rotation
            if (modal == true || start == false) {
                clearInterval(interval)
            }
            return () => {
                clearInterval(interval)
            }
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
        inputRange: [0, 100],                           //pour des vitesses entre 0 et 100km/h
        outputRange: outputRange,
    });

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
            /*if (energie.length > 0) {
                var ratioEffort = state.user.pma ? (energie.reduce((a, b) => a + b) / energie.length) / state.user.pma : (energie.reduce((a, b) => a + b) / energie.length) / 250 //bonus d'effort
                if (ratioEffort > 0.5) {
                    ratioEffort > 0.75 ? defi.points = defi.points + defi.points * (ratioEffort - 0.5) : defi.points = defi.points + defi.points * (ratioEffort - 0.25)
                }
            }*/
            for (var i = 0; i < defi.aims.length; i++) {
                var but = defi.aims[i]
                //console.log(defi)
                if (!defi.islong) {
                    //console.log("défis valide: "+(but.type === "distance" && distance * 1000 >= but.number) +" "+ distance*1000 +" - "+ but.number)
                    if ((but.type === "distance" && distance * 1000 >= but.number)
                        || (but.type === "power" && energie.length > 0 && energie.reduce((a, b) => a + b) >= but.number)
                        || (but.type === "duration" && moment.duration(currentTime).asSeconds() - defi.startTime === but.number)
                        || (but.type === "%" && energie.length > 0 && energiep.length > 0 && defi.startE !== null && (energie.reduce((a, b) => a + b) - defi.startE >= energiep.reduce((a, b) => a + b) - defi.startE))
                    ) {
                        bvalid = bvalid + 1
                    }
                    if (but.type === "%") {                                              //cas des défis de pentes an fonction de la durée écoulée
                        var v = vitesses[vitesses.length - 1]//vitesses.reduce((sum,item)=>sum+item) / vitesses.length
                        if (defi.startE === undefined) {
                            defis[defic].startE = energie.reduce((a, b) => a + b)
                            setDefis(defis)
                        } else {
                            var pth = v * state.user.weight * 9.81 * but.number * 0.6           //calcul de la force à demander à l'utilisateur, en fonction de sa vitesse actuelle
                            console.log(v + " - " + pth)
                            //sendMessage(3,`{"watts":${pth}}`)
                            setWatts(Math.round(pth))
                            setenergiep([...energiep, pth])
                        }
                    }
                } else {
                    //validation des défis longs
                    if ((but.type === "distance" && /*state.user.totalDistance +*/ distance >= but.number)
                        || (but.type === "power" &&/* state.user.totalEnergie +*/ energie >= but.number)
                        || (but.type === "duration" && moment.duration(currentTime).asSeconds())) {
                        bvalid = bvalid + 1

                    }
                }
            }
            if (bvalid === defis[defic].aims.length) {
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
        setDefis([...defis, ...state.user.challenges])
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
        setErreur(["Fin de Session", "Ralentissez progressivement avant la fin de la session."])
        setStyleModal(styles.endingModal)
         setModal(true)
         //console.log(erreur[0])
         const timer = setInterval(showWarning, 1250)
         setTimeModal(timer)
            let t = setInterval(()=>{
              if (w <= 2){
                w=0
                cons.writeUInt32BE(wattConverter(w),0)
                cons.writeUInt8(0,7) //led 1 éteinte
                cons.writeUInt8(0,8) // led 2 éteinte
                cons.writeUInt8(0,9) // led 3 éteinte
                sendMessage(5, cons,0,inc )
               // console.log("end")
                clearInterval(t)
                server.destroy()
                goTo(props)
          }
          else{
            w=w-Math.round(w*0.20)
            cons.writeUInt32BE(wattConverter(w),0)
            cons.readUInt8(7) === 0 ? cons.writeUInt8(2,7)  : cons.writeUInt8(0,7)
            cons.readUInt8(8) === 0 ? cons.writeUInt8(2,8) : cons.writeUInt8(0,8)
            cons.writeUInt8(0,9) === 0 ? cons.writeUInt8(2,9) : cons.writeUInt8(0,9)// led 3 éteinte
            sendMessage(5, cons,0,inc )
            //console.log(w)
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
                        port: 333,
                        host: '192.168.1.200',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                } else {                                //configuration android device
                    return config = {
                        port: 333,
                        host:  '192.168.1.200',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                }
            } else {
                if (Platform.OS == 'ios') {             //configuration iphone
                    return config = {
                        port: 333,
                        host: '192.168.1.200',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                } else {                                //configuration android device
                    return config = {
                        port: 333,
                        host:  '192.168.1.200',
                        reuseAddress: true,
                        interface:'wifi'
                    }
                }
            }
        })
        //console.log(config)
        try {
            server.connect(config,
                () => {
                    console.log("connecté")
                    //envoi d'une première consigne
                    cons.writeUInt32BE(wattConverter(watts),0)
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
               // console.log("server error: " + error)
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
        saveSession()
    }, [distance, energie, defis])
    // réccupération des défis longs
    React.useEffect(() => {
        getDefiLong()
        //testWbSckt()
        socketServer()
        defis[defic].startTime = 0
        setDefis(defis)
        saveSession()
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
        //console.log(header.readUInt16BE(4))
        //setDonnees(message)
        //relevés de la carte vers le mobile
           switch (type) {
               case 1:
                    var frequ = contenu.readUInt32BE(8)
                    var vitesse = Math.PI*0.0007*(frequ*3600/18)// 36 = nb bobines
                    //console.log( `vitesse : ${vitesse} - distance parcourue${(vitesse/3600)}`)
                    setDistance(dist => distance + (vitesse/3600) )
                    setRpm(Math.round((frequ*60)/(18*5)))
                    var puiss =  releves.readUInt32BE(12) * releves.readUInt32BE(16)
                    setEnergie([...energie, puiss])
                    //console.log(`energie : ${puiss} - calories : ${puiss*0.239}`)
                    //console.log(`vitesse : ${vitesse}  - rpm: ${rpm}`)
                    setTimeout(() => {setVitesses([...vitesses,vitesse])}, 900)
                   let s = {time:moment.duration(currentTime).asSeconds(),speed:Number.parseInt(vitesse),power:puiss,session:{id:session.id}}
                   setSequences(sequences => [...sequences,s])
                    /*console.log("type message: "+contenu.readUInt32BE(8))
                    console.log(`tension génératrice = ${contenu.readUInt32BE(16)}`)
                    console.log("angle: "+( ((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/100)*360 - 160 ) +" - "+ endPosition )
                    console.log("seg:"+( (vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/100 * 200 )+" - "+seg )
                    console.log(`alerte surt : ${contenu.readUInt8(46)} - temp aux : ${contenu.readUInt32BE(0)} - temp gene: ${contenu.readUInt32BE(4)}`)*/

                   if (contenu.readUInt32BE(0) >= 30 || contenu.readUInt32BE(4) >= 40  )
                   {
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surchauffe détectée, veuillez cesser de pédaler"])
                       setModal(true)
                   }
                   if (contenu.readUInt8(46) === 1) {
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surtension dans le système, veuillez cesser de pédaler"])
                       setModal(true)
                   }
                   if (contenu.readUInt32BE(8) < 20 ){
                       setErreur(["Attention", "Votre rythme ne permet pas de produire la puissance que vous demandez. Adaptez votre allure ou réduisez la puissance demandée."])
                       setStyleModal(styles.warningModal)
                       setModal(true)
                       const timer = setInterval(showWarning, 500)
                       setTimeModal(timer)
                   }
                   /*if (contenu.readUInt32BE(20) >+ contenu.readUInt32BE(8) +0.05 || contenu.readUInt32BE(20) <= contenu.readUInt32BE(8)+ 0.05){
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention une différence de fréquence a été détectée dans le réseau électrique, veuillez cesser de pédaler"])
                       setModal(true)
                   }*/
                    break;
                case 2:
                   var frequ = contenu.readUInt32BE(8)
                   var vitesse = Math.PI*0.0007*(frequ*3600/18)// 36 = nb bobines
                   //console.log( `vitesse : ${vitesse} - distance parcourue${(vitesse/3600)}`)
                   setDistance(dist => distance + (vitesse/3600) )
                   setRpm(Math.round((frequ*60)/(18*5)))
                   var puiss =  releves.readUInt32BE(12) * releves.readUInt32BE(16)
                   setEnergie([...energie, puiss])
                   //console.log(`energie : ${puiss} - calories : ${puiss*0.239}`)
                   //console.log(`vitesse : ${vitesse}  - rpm: ${rpm}`)
                   setVitesses([...vitesses,vitesse])
                    s = {time:currentTime,speed:vitesse,power:puiss,session:{id:session.id}}
                    console.log(s)
                    setSequences(sequences.push(s))
                   /*console.log(contenu.readUInt32BE(8))
                   console.log("angle: "+( ((vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120)*360 - 160 ) +" - "+ endPosition )
                   console.log("seg:"+( (vitesses[vitesses.length-2] - vitesses[vitesses.length-1])/120 * 200 )+" - "+seg )
                   console.log(`alerte surt : ${contenu.readUInt8(46)} - temp aux : ${contenu.readUInt32BE(0)} - temp gene: ${contenu.readUInt32BE(4)}`)*/
                   if (contenu.readUInt32BE(0) >= 30 || contenu.readUInt32BE(4) >= 40  )
                   {
                       //saveSession()
                       //stopSession(watts)
                       cons.writeUInt32BE(wattConverter(watts),0)
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
                       cons.writeUInt32BE(wattConverter(watts),0)
                       cons.writeUInt8(4,7) //led 1 rouge
                       cons.writeUInt8(4,8) // led 2 rouge
                       cons.writeUInt8(0,9) // led 3 éteinte
                       sendMessage(5, cons,0,inc )
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention surtension dans le système, veuillez cesser de pédaler"])
                       setModal(true)
                       //console.log("alerte surtention - alerte surt"+ contenu.readUInt8(46))
                   }
                   if (contenu.readUInt32BE(8) < 20 ){
                       cons.writeUInt32BE(wattConverter(watts),0)
                       cons.writeUInt8(3,7) //led 1 jaune
                       cons.writeUInt8(0,8) // led 2 éteinte
                       cons.writeUInt8(0,9) // led 3 éteinte
                       sendMessage(5, cons,0,inc )
                       setErreur(["Attention", "Votre rythme ne permet pas de produire la puissance que vous demandez. Adaptez votre allure ou réduisez la puissance demandée."])
                       setStyleModal(styles.warningModal)
                       setModal(true)
                       const timer = setInterval(showWarning, 500)
                       setTimeModal(timer)
                       cons.writeUInt32BE(wattConverter(watts),0)
                       cons.writeUInt8(2,7) // led 1 vert
                       cons.writeUInt8(2,8) // led 2 vert
                       cons.writeUInt8(2,9) // led 3 vert
                       sendMessage(5, cons,0,inc )
                   }
                   /*if (contenu.readUInt32BE(20) >+ contenu.readUInt32BE(8) +0.05 || contenu.readUInt32BE(20) <= contenu.readUInt32BE(8)+ 0.05){
                       setStyleModal(styles.dangerModal)
                       setErreur(["Erreur", "Attention une différence de fréquence a été détectée dans le réseau électrique, veuillez cesser de pédaler"])
                       setModal(true)
                   }*/
                   break;
                case 5: //consigne du mobile vers la carte
                   console.log(`consigne: ${contenu.readUInt32BE(0)} 
                    - force charge : ${contenu.toString('hex',4,5)} 
                    - shutdown :${contenu.toString('hex',5,6)} 
                    - etat usb :${contenu.toString('hex',6,7)} 
                    - led 1: ${contenu.toString('hex',7,8)} 
                    - led 2: ${contenu.toString('hex',8,9)} 
                    - led 3 : ${contenu.toString('hex',9,10)} 
                    - buzzer: ${contenu.toString('hex',10,11)} 
                    - spare: ${contenu.toString('hex',11,contenu.length)} 
                    - length : ${contenu.length}`)
                   break;
            }
    }
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
                                          distance={distance} cumulD={state.user.totalDistance !== undefined ? state.user.totalDistance : 0}/>
                    </ImageBackground>
                    <View style={[{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: '25%',
                        marginTop: Platform.OS === "android" ? 0 : 0
                    }]}>
                        <TouchableOpacity onPress={() => {
                            if (watts > 0) {
                                setWatts(watts - 5)
                                cons.writeUInt32BE(wattConverter(watts-5),0)
                                cons.writeUInt8(2,7)
                                cons.writeUInt8(2,8)
                                cons.writeUInt8(2,9)
                                sendMessage(5, cons,0,inc )
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
                                    cons.writeUInt32BE(wattConverter(watts+5),0)
                                    cons.writeUInt8(2,7)
                                    cons.writeUInt8(2,8)
                                    cons.writeUInt8(2,9)
                                    sendMessage(5, cons,0,inc )
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
        height: 120,
        width: "75%",
        backgroundColor: "#5FCDFAAA",
        justifyContent: "center",
        alignItems: "center",
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
