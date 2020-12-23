// Imports Modules
import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Linking,
    ImageBackground,
    AppRegistry,
    Platform,
    Button
} from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import Navigation from '../../assets/navigation'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import NavApp from "../navigation/NavApp";
import {height} from "react-native-daterange-picker/src/modules";
// Imports Components


export default class Jumelage extends React.Component {
    state = {
        code: 'qrcode'
    }
    onSuccess = e => {
        this.props.navigation.navigate("ListeDefis")
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
                                    containerStyle={styles.cameracontainer}
                                    topContent={  <View style={{alignItems:"center"}}>
                                        <LogoMin /><Text style={[styles.textTitle, {fontSize:70, marginTop:5}]}>Jumellage</Text>
                                        <Text style={[styles.midText,{marginBottom:20}]}>
                                            Commencez à pédaler pour allumer la machine, puis scannez le qrcode.
                                        </Text>
                                    </View>
                                        }
                                    topViewStyle={styles.header}
                                    cameraStyle={styles.middle}
                                    bottomContent={
                                        <View style={{alignItems:'center'}}>
                                            <Text style={[styles.midText, {marginBottom:'10%'}]}>Scannez le qrcode pour associer l'appareil.</Text>
                                            <NavApp navigation={this.props.navigation} />
                                        </View>
                                       }
                                    bottomViewStyle={styles.footer}
                                />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        height:'110%'
    },
    cameracontainer:{
        height:Dimensions.get("screen").height,
        paddingTop:0,
        marginTop: 0
    },
    header: {
        position:"absolute",
        top:0,
         flex:1,
         flexDirection: 'column',
        justifyContent:"space-around",
         zIndex: 100,
        marginTop:30
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
        position: 'absolute',
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
        ...Platform.select({
            ios: {
                height:Dimensions.get("screen").height/3+50,
                top:Dimensions.get("screen").width/4+10,
                width:Dimensions.get("screen").width+10 ,
                left:-100
            },
            android: {
                left:-Dimensions.get("screen").width/4,
                top:Dimensions.get("screen").width/4,
                width:Dimensions.get("screen").width ,
            }
        })
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
        height: '115%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    footer: {paddingTop: 50,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 100,
        position:"absolute",
        ...Platform.select({
            ios: {
                backgroundColor:"transparent",
                bottom:-18
            },
            android: {
                backgroundColor:"#05141B",
                bottom:0
            }
        })

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
