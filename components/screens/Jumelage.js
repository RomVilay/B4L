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


export default class Jumelage extends React.Component {
    state = {
        code: 'qrcode'
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
                <Image source={require('../../assets/fond.png')} style={styles.fond} />
                            <QRCodeScanner
                                    onRead={this.onSuccess.bind(this)}
                                    topContent={  <View style={styles.header}><LogoMin /><Text style={[styles.textTitle, {fontSize:70, marginTop:5}]}>Jumellage</Text>
                                        <Text style={[styles.midText,{marginBottom:20}]}>Commencez à pédaler pour allumer la machine, puis scannez le qrcode.</Text>
                                    </View>
                                        }
                                    topViewStyle={{flex:1}}
                                    cameraStyle={{
                                        height:'80%',
                                        marginTop:'10%'}}
                                    bottomContent={
                                        <View style={{alignItems:'center'}}>
                                            <Text style={[styles.midText, {marginBottom:'10%'}]}>Scannez le qrcode pour associer l'appareil.</Text>
                                            <NavApp navigation={this.props.navigation} />
                                        </View>
                                       }
                                    bottomViewStyle={{flex:1,padding:0, margin:0}}
                                />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
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
        fontSize: 50,
        fontFamily: 'TallFilms',
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
        fontFamily: 'GnuolaneRG-Regular',
        color: 'white',
        fontSize: 16
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