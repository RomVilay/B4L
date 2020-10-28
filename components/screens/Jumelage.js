// Imports Modules
import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    TouchableOpacity,
    Linking,
    ImageBackground,
    AppRegistry,
    Button
} from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import Navigation from '../../assets/navigation'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import NavApp from "../navigation/NavApp";
// Imports Components

var qrcode = require('../../assets/qrcode.png')

export default class Jumelage extends React.Component {
    state = {
        code: qrcode
    }
    onSuccess = e => {
        this.props.navigation.navigate("Compteur")
       /* Linking
            .openURL(e.data)
            .catch(err =>
            console.error('An error occured', err)
        );*/
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/fond.png')} style={{flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"}}>
                            <QRCodeScanner
                                    onRead={this.onSuccess.bind(this)}
                                    topContent={  <View style={styles.header}><LogoMin /><Text style={[styles.textTitle, {fontSize:30, marginTop:5}]}>Jumellage</Text>
                                        <Text style={[styles.midText,{marginBottom:20}]}>Commencez à pédaler pour allumer la machine, puis scannez le qrcode.</Text>
                                    </View>
                                        }
                                    topViewStyle={{flex:1}}
                                    cameraStyle={{
                                        height:'80%',
                                        marginTop:'10%'}}
                                    bottomContent={
                                        <View>
                                            <Text style={[styles.midText]}>Scannez le qrcode pour associer l'appareil.</Text>
                                            <Text>Truc</Text>
                                        </View>
                                       }
                                    bottomViewStyle={{flex:1,alignContent:'stretch',padding:0, margin:0}}
                                />
                    <NavApp navigation={this.props.navigation} />
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 100
    },

    header: {
         flex:1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         zIndex: 100,
        marginTop:50
    },
    textTitle: {
        color: "#5FCDFA",
        textTransform: 'uppercase',
        fontSize: 25,
        fontFamily: 'DIN Condensed',
     },
    item: {
        width: 80,
        height: 100,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    middle: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
    },
    midText: {
        color: 'white',
        fontSize: 16
    },

    fond: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '110%',
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    footer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 100,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
})
AppRegistry.registerComponent('default', () => ScanScreen);