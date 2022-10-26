import React, {useContext, useState} from 'react';
import {
    View,
    Alert,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Text,
    ImageBackground,
    Image,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    Platform, Button, TextInput
} from 'react-native';
import LogoMin from '../../assets/logoMin';
import TcpSocket from 'react-native-tcp-socket';
import DeviceInfo from "react-native-device-info";
import moment from "moment";
/**
 * Page de test des fonctionalités de la carte
 * @param {*} props 
 * @returns 
 */
export default function Setup(props){
    const [server,setServer] = useState(new TcpSocket.Socket())
    const [ip,setIp] = useState('192.168.1.200') // ip localhost '127.0.0.1') /
    const [port,setPort] = useState(333)// port localhost:  )8080
    const [connect,setConnect] = useState(false)
    const [lastmessage,setLastmessage] = useState()
    const [donnees,setDonnees] = useState()
    const [typeMessage,setTypeM] = useState()
    const [inc,setInc] = useState(0)
    //consign
    const [cons,setCons] = useState(0)
    const [fc,setFc] = useState(0)
    const [shutdown,setShutdown] = useState(0)
    const [usb,setUsb] = useState(0)
    const [led1,setLed1] = useState(0)
    const [led2,setLed2] = useState(0)
    const [led3,setLed3] = useState(0)
    const [buzzer,setBuzz] = useState(0)
    const [spare,setSpare] = useState(0)
    const [router,setRouter] = useState("Netgear66")
    const [krouter,setKrouter] = useState("Curlylotus66")
    require('node-libs-react-native/globals');
    const r = new Buffer.from('a55a00000002003a0001a14c000000007fc0000000000000c1fa00000000000000000000c148000000000000000000000000000001010100010000000000000000000000b8fb', 'hex')
    var t = ["tempAux",                 //température auxilliaire
        "tempPuis",                     //température puissance
        "fgene",                        //frequence génératrice (Hz)
        "igene",                        //courant génératrice (A)
        "vgene",                        //tension génératrice (V)
        "fsec",                         //frequence secteur (H)
        "isec",                         //courant secteur (A)
        "vsec",                         //tension secteur (V)
        "analog",                       // entrée analog auxilliaire
        "consDC",                       //dernière consigne d'injection
        "tor1",                         //entrée tor 1
        "tor2",                         //entrée tor 2
        "tor3",                         //entrée tor 3
        "tor4",                         //entrée tor 4
        "fcharge",                      //force charge
        "asurt",                        //alarme de surtention
        "stamp",                        //état de l'amplification
        "stusb",                        //état usb 1       status: OFF 0x00,  STANDBY 0x01 , ON 0x02
        "eusb",                         //erreur usb
        "led1",                         //couleur led 1 couleurs :  0x04,  VERT    0x02,  BLEU    0x01,  JAUNE   0x03,  MAGENTA 0x05,  CYAN    0x06, BLANC   0x08, NOIR    0x00
        "led2",                         //couleur led 2
        "led3",                         //couleur led 3
        "buzz",                         //état buzzer
        "erreur",                       // à définir
        "spare1",                       //spare 1
        "spare2"                        //spare 2
    ]
    var consigne = Buffer.from([
        0xFF,0xFF,0xFF,0xFF, //consigne
        0x00,                //force charge
        0x00,                //shutdown amp
        0x00,                //alimentation usb
        0x00,                //led 1
        0x00,                //led 2
        0x00,                //led 3
        0x00,                //buzzer
        0x00                 //spare
    ])
    consigne.writeUInt32BE(20,0)
    var releves = new Buffer.from([
        0x00,0x00,0x00,0x01,                     //température auxilliaire 4 octets 32
        0x00,0x00,0x00,0x01,                     //température puissance
        0x00,0x00,0x00,0x01,                     //frequence génératrice (Hz)

        0x00,0x00,0x00,0x01,                     //courant génératrice (A)
        0x00,0x00,0x00,0x01,                     //tension génératrice (V)
        0x00,0x00,0x00,0x01,                     //frequence secteur (H)

        0x00,0x00,0x00,0x01,                     //courant secteur (A)
        0x00,0x00,0x00,0x01,                     //tension secteur (V)
        0x00,0x00,0x00,0x01,                     // entrée analog auxilliaire
        0x00,0x00,0x00,0x01,                    //dernière consigne d'injection

        0x00,                          //entrée tor 1
        0x00,                          //entrée tor 2
        0x00,                          //entrée tor 3
        0x00,                          //entrée tor 4
        0x00,                          //force charge
        0x00,                          //alarme de surtention
        0x00,                          //état de l'amplification
        0x00,                          //état usb 1
        0x00,                          //erreur usb
        0x00,                          //couleur led 1
        0x00,                          //couleur led 2
        0x00,                          //couleur led 3
        0x00,                          //état buzzer
        0x00,                          //erreur à définir
        0x00,                          //spare 1
        0x00])                        //spare2
    releves.writeFloatBE(25, 0) //température auxilliaire 4 octets 32
    releves.writeFloatBE(0, 4)
    releves.writeFloatBE(0, 8)

    releves.writeFloatBE(0, 12)
    releves.writeFloatBE(0, 16)
    releves.writeFloatBE(0, 20)

    releves.writeFloatBE(0, 24)
    releves.writeFloatBE(0, 28)
    releves.writeFloatBE(0, 32)
    releves.writeFloatBE(0, 36)
    releves.writeUInt8(1,50)
    //releves.writeUInt32BE(3, ) //temperature puissance
    //releves.writeUInt32BE(7) //freq generatrice
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

    async function socketServer() {
        var config;
                                //configuration simulateur
                    if (Platform.OS == 'ios') {              //configuration iphone
                        config = {
                            port: port,
                            host: ip,
                            reuseAddress: true,
                            interface:"wifi"
                        }
                    } else {                                //configuration android device
                        config = {
                            port: port,
                            host: ip,
                            reuseAddress: true,
                            interface:"wifi"
                        }
                    }
        //console.log(config)
        try {
            server.connect(config, () => {
                    //envoi d'une première consigne
                    console.log("connect")
                    setConnect(true)
                });
            server.on('data', (data) => {
                //traitement des données renvoyées par la carte
                readData(data)
                //setDonnees(data)
            });
            server.on('error', (error) => {
                // traitement des erreurs en provenance du socket, affichage dans la console et sur le mobile
                Alert.alert("server error " ,error ,[{text:"Cancel"}], {cancelable:true} )
            })
            server.on('close',() =>{
                setConnect(false)
                console.log("fin de connexion")
            })
            setServer(server)
        } catch (e) {
            console.log("erreur :" + e)
        }
    }
    /**
     * fonction envoi des messages
     * */
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
            setLastmessage(head)
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
     * fonction lecture de messafe
     * @param message message envoyé par le serveur
     */
    function readData(message) {
        console.log(message.toString('hex'))
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
            console.log(type)
            //setDonnees(message)
            //relevés de la carte vers le mobile

            switch (type){
                case 1 :
                    var data = {}
                    console.log(t)
                    for (let i = 0; i < t.length; i++){
                        if (i < 10){
                            data[t[i]] = contenu[i]
                            data[t[i]]=contenu.readUInt32BE(i*4)
                            //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i*2}`)
                        } else {
                            data[t[i]]=contenu.readUInt8(i+29)
                            //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i+20}`)
                        }
                        //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i}`)
                        console.log(`${t[i]} - ${data[t[i]]} `)
                    }
                    //data[led1] = contenu.toString('hex',34,38)
                    //console.log(header)
                    //console.log(Object.entries(data))
                    setDonnees(Object.entries(data).map(item => `${item} \n`))
                    if (data.tempAux >= 30 && data.tempPuis >= 40  )
                    {
                        console.log("surchauffe")
                        consigne.writeUInt8(1,5) //coupure ampli
                        consigne.writeUInt8(4,7) //led 1 rouge
                    }
                    if (data.asurt === 1) {
                        console.log("alerte surtention")
                    }
                    if (data.fsec > data.fgene+0.05 || data.fsec < data.fgene-0.05){
                        console.log("différence de fréquence de courant")
                    }

                    //sendMessage(2,"",1,inc)
                    break;
                case 2:
                    setTypeM(`acquitté ${header.readUInt16BE(8)}`)
                    var data = {}
                    //console.log(t)
                    //console.log("relevé:"+contenu.readFloatBE(8))
                    for (let i = 0; i < t.length; i++){
                        if (i < 10){
                            data[t[i]] = contenu[i]
                            data[t[i]]=contenu.readUInt32BE(i*4)
                            //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i*2}`)
                        } else {
                            data[t[i]]=contenu.readUInt8(i+29)
                            //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i+20}`)
                        }
                        //console.log(` ${t[i]} ${data[t[i]]} - ${contenu[i]} ${i}`)
                        console.log(`${t[i]} - ${data[t[i]]} `)
                    }
                    //console.log(contenu.subarray(4,8).toString('hex'))

                        /*if (header.readUInt16BE(8) == 0) {
                        server.write(lastmessage)
                    } else (
                        setLastmessage('')
                    )*/
                    break;
                case 3:  //message d'erreur de la carte
                    var data = {}
                    var j = 0
                    for (let i = 0; i < t.length; i++){
                        /*if (j < 10){
                            releves[t[i]]=contenu.readInt16BE(j)
                        } else {
                            releves[t[i]]=contenu.toString('hex',j,j+1)
                        }*/
                        data[t[i]]=contenu[i]
                        console.log(`${t[i]} - ${contenu[i]}`)
                    }
                    /*console.log(header)
                    console.log(Object.entries(data))
                    console.log(Object.entries(data).find(item => item.key == "erreur"))*/
                    setDonnees(Object.entries(data).map(item => `${item} \n`))
                    break;
                case 5: //consigne du mobile vers la carte
                    consigne = contenu
                    console.log(`consigne: ${contenu.readFloatBE(0)} - force charge : ${contenu.toString('hex',4,5)} 
                    - shutdown :${contenu.toString('hex',5,6)} - etat usb :${contenu.toString('hex',6,7)} 
                    - led 1: ${contenu.toString('hex',7,8)} - led 2: ${contenu.toString('hex',8,9)} - led 3 : ${contenu.toString('hex',9,10)} 
                    - buzzer: ${contenu.toString('hex',10,11)} - spare: ${contenu.toString('hex',11,contenu.length)} length : ${contenu.length}`)
                    let d = {
                        'consigne': contenu.readFloatBE(0),
                        'force charge' : contenu.toString('hex', 4, 5),
                        'shutdown' :contenu.toString('hex', 5, 6),
                        'etat usb' :contenu.toString('hex', 6, 7),
                        'led 1':contenu.toString('hex', 7, 8),
                        'led 2': contenu.toString('hex', 8, 9),
                        'led 3 ': contenu.toString('hex', 9, 10),
                        'buzzer': contenu.toString('hex', 10, 11)
                    }
                    //setDonnees(Object.entries(d).map(item => `${item} \n`))
                    break;
                case 6: //nouveau ssid émis par le vélo
                    //console.log(message.toString('hex'))
                    break;
                case 9:  //nouveau ssid émis par le mobile

                    break;
                case 11: // adresse ip, gateway, masque, MAC

                    break;
            }
        //}

    }

    return(
        <SafeAreaView>
            <Image style={styles.fond} source={require('../../assets/fond.png')} resizeMode="stretch" />
            <ScrollView contentContainerStyle={styles.container}>
                <LogoMin style={{alignSelf:"center", marginTop:"15%"}}/>
                <Text style={{color:"white", textAlign:"center", margin:"5%", fontSize:25}}>Setup Screen</Text>
                <View style={{ color:"white", alignItems:"center"}}>
                    <Text style={{color:"white"}}>IP carte embarquée</Text>
                    <TextInput value={ip} style={[ styles.inputContainer,{color:"white"}]} onChangeText={val => setIp(val)} placeholder={"192.168.1.200"} />
                    <Text style={{color:"white"}}>port</Text>
                    <TextInput value={port.toString()} style={[ styles.inputContainer,{color:"white"}]} onChangeText={val => setPort(val)} />
                </View>
                <Button title={"Connection"} onPress={() => socketServer() }  color="#5FCDFA" />
                { connect ? <View >
                    <Text style={{color:"green", alignSelf:"center"}}> Connecté </Text>
                    <Button title={"eq 750w"} onPress={()=> consigne.writeUInt32BE(4095,0)} />
                    <Button title={"eq 0w "} onPress={()=> consigne.writeUInt32BE(20,0)} />
                    <TextInput value={consigne.readUInt32BE(0)} style={styles.input} onChangeText={val => { consigne.writeUInt32BE(val,0)}}/*Number.isNaN(parseFloat(val)) ? consigne.writeFloatBE(0,0) : consigne.writeFloatBE(parseFloat(val),0)}}*/ placeholder="consigne" placeholderTextColor="white" />
                    <TextInput value={fc} style={styles.input} onChangeText={val => consigne.writeUInt8(val,4)} placeholder="force charge" placeholderTextColor="white" />
                    <TextInput value={shutdown} style={styles.input} onChangeText={val => consigne.writeUInt8(val,5)} placeholder="shutdown" placeholderTextColor="white" />
                    <TextInput value={usb} style={styles.input} onChangeText={val => consigne.writeUInt8(val,6)} placeholder="etat usb" placeholderTextColor="white" />
                    <TextInput value={led1} style={styles.input} onChangeText={val => consigne.writeUInt8(val,7)} placeholder="couleur led 1" placeholderTextColor="white" />
                    <TextInput value={led2} style={styles.input} onChangeText={val => consigne.writeUInt8(val,8)} placeholder="led2" placeholderTextColor="white" />
                    <TextInput value={led3} style={styles.input} onChangeText={val => consigne.writeUInt8(val,9)} placeholder="led3" placeholderTextColor="white" />
                    <TextInput value={buzzer} style={styles.input} onChangeText={val => consigne.writeUInt8(val,10)} placeholder="etat buzzer" placeholderTextColor="white" />
                    <Button title={'envoyer consigne'} onPress={ () =>{
                        //consigne.writeFloatLE(750,0)
                        console.log(`consigne: ${consigne.toString('hex',0,4)} - force charge : ${consigne.toString('hex',4,5)} 
                    - shutdown :${consigne.toString('hex',5,6)} - etat usb :${consigne.toString('hex',6,7)} 
                    - led 1: ${consigne.toString('hex',7,8)} - led 2: ${consigne.toString('hex',8,9)} - led 3 : ${consigne.toString('hex',9,10)} 
                    - buzzer: ${consigne.toString('hex',10,11)} - spare: ${consigne.toString('hex',11,consigne.length)} length : ${consigne.length}`)
                        sendMessage(5, consigne,0,inc )
                    } }/>
                    <Button title={'message relevés'} onPress={ () => server.write(sendMessage(1, releves,0, inc ))}   />
                    <Text style={{ color:"white"}}> Données Reçues:</Text>
                    <Text style={{ color:"white"}}> {typeMessage}</Text>
                    <Text style={{ color:"white"}}>{donnees !== undefined ? donnees.tempAux : 0}</Text>
                    <Text style={{ backgroundColor:"#FFFFFFAA"}}> {donnees} </Text>
                </View> : <></>}
                <Button title={"Déconnexion"} onPress={() => server.destroy() }  color="#5FCDFA" />
                <View style={[{alignItems:"center", width: 195}, styles.inputContainer]}>
                    <Text style={{ color:"white"}}>nouveau SSID</Text>
                    <TextInput value={ip} style={[ styles.inputContainer,{color:"white"}]} placeholder={"velocnx"} />
                    <Text style={{ color:"white"}}>clé</Text>
                    <TextInput value={ip} style={[ styles.inputContainer,{color:"white"}]}   />
                    <Button title={"modifier le ssid"}  color="#5FCDFA" />
                </View>
                <View style={[{alignItems:"center", width: 195}, styles.inputContainer]}>
                    <Text style={{ color:"white"}}>connexion au routeur local</Text>
                    <TextInput value={router} style={[ styles.inputContainer,{color:"white"}]} placeholder={"ssid"} />
                    <Text style={{ color:"white"}}>clé</Text>
                    <TextInput secureTextEntry={true} value={krouter} style={[ styles.inputContainer,{color:"white"}]}   />
                    <Button title={"se connecter"}  color="#5FCDFA" onPress={ () => {
                        //sendMessage(6,"ssid",1,inc)
                    }}/>
                </View>
                <View style={[{alignItems:"center", width: 195}, styles.inputContainer]}>
                    <Text style={{ color:"white", fontSize:15, borderBottomWidth: 3, borderBottomColor:"#5FCDFA"}}>configuration réseau</Text>
                    <Text style={{ color:"white"}}>Adresse IP</Text>
                    <TextInput  style={[ styles.inputContainer,{color:"white", width:100}]} placeholder={"ip"} />
                    <Text style={{ color:"white"}}>Masque réseau</Text>
                    <TextInput   style={[ styles.inputContainer,{color:"white", width:100}]}   />
                    <Text style={{ color:"white"}}>Passerelle</Text>
                    <TextInput   style={[ styles.inputContainer,{color:"white", width:100}]}   />
                    <Text style={{ color:"white"}}>Adresse MAC</Text>
                    <TextInput   style={[ styles.inputContainer,{color:"white", width:100}]}   />
                    <Button title={"mettre à jour"}  color="#5FCDFA" onPress={ () => {
                        //sendMessage(11,"config réseau",1,inc)
                    }}/>
                </View>
                <View style={{borderWidth:2, borderColor:"#5FCDFA",  marginTop: "5%", borderRadius: 10}}>
                    <Text style={{color:"#5FCDFA", padding: "2%"}} onPress={() => { props.navigation.navigate("Demarrage")}}>Retour</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    fond: {
        flex:1,
        position:"absolute",
        zIndex:0,
        height:"500%",
        width:"100%"
    },
    container:{
        alignItems:"center"
    },
    input:{
        color:"white",
        borderWidth:1,
        borderColor:"white"
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        borderColor: '#5FCDFA',
        backgroundColor: '#284462',
        padding:"2.5%"
    },
})
