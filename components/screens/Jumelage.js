// Imports Modules
import React, { useEffect } from 'react';
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
  Button,
  PermissionsAndroid,
} from 'react-native';
// Imports Assets
import LogoMin from '../../assets/logoMin';
import Navigation from '../../assets/navigation';
import NavApp from '../navigation/NavApp';
import {height} from 'react-native-daterange-picker/src/modules';
import {Camera, CameraCaptureError, useCameraDevices} from 'react-native-vision-camera';
// Imports Components
import WifiManager from 'react-native-wifi-reborn';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

import 'react-native-reanimated'

/**
 * écran d'appairage de la carte embarquée
 * @param {*} props
 * @returns
 */


export default function Jumelage(props) {
  // const newCameraPermission = await Camera.requestCameraPermission()
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = React.useState(false);
  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    setHasPermission(status);
    if (status !== 'authorized') {
      await Camera.requestCameraPermission()
      status = await Camera.getCameraPermissionStatus();
      setHasPermission(status);
      if (status === 'denied') {
        console.log('You will not be able to scan if you do not allow camera access');
      }
    }
  };
  React.useEffect(() => {
    checkCameraPermission();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  React.useEffect(() => {
    if (barcodes.length > 0 && barcodes[0].rawValue !== undefined){
      //console.log(barcodes[0].rawValue.slice(7, 19))
      //console.log(`ssid: ${barcodes[0].rawValue.slice(7, 10)} - password ${barcodes[0].rawValue.slice(19, barcodes[0].rawValue.length - 2)}`)
      requestLocationPermission(barcodes[0].rawValue.slice(7, 10), barcodes[0].rawValue.slice(19, barcodes[0].rawValue.length - 2));
    }  
  }, [barcodes]);
  //console.log(devices);
  //fonction en cas de réussite de scan du qrcode
  const requestLocationPermission = async (ssid, psw) => {
   if ( Platform.OS === 'android' ) {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Bike For Life app permission',
        message: "Bike for life a besoin de l'accès à la localisation pour détecter le wifi. ",
        buttonNeutral: 'me demander ultérieurment',
        buttonNegative: 'bloquer',
        buttonPositive: 'autoriser',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        connect(ssid, psw);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
   }
   if (Platform.OS === 'ios') {
    try {
      //console.log(barcodes[0].rawValue.slice(7, 19)+" - "+barcodes[0].rawValue.slice(28, barcodes[0].rawValue.length - 2))
        connect(barcodes[0].rawValue.slice(7, 19), barcodes[0].rawValue.slice(28, barcodes[0].rawValue.length - 2));
    } catch (err) {
      console.warn(err);
    }
   }
    
  };
  // connexion en wifi à la carte
  const connect = async (ssid, psw) => {
    try {
      const data = await WifiManager.connectToProtectedSSID(ssid, psw, false);
      console.log('Connection réussite!');
      props.navigation.navigate('Compteur', {defis: props.route.params.defis});
    } catch (error) {
      console.log('Connection échouée!', error);
    }
  };
  const onSuccess = e => {
    let ssid = e.data.slice(7, 10);
    let psw = e.data.slice(19, e.data.length - 2);
    //console.log(e.data.slice(7,10)+" - "+e.data.slice(19,e.data.length-2))
    requestLocationPermission(ssid, psw);
    /* Linking
            .openURL(e.data)
            .catch(err =>
            console.error('An error occured', err)
        );*/
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/fond.png')} style={styles.fond} />
      <View style={{alignItems: 'center', flex:1, marginTop:"5%" }}>
        <LogoMin />
        <Text style={[styles.textTitle, {fontSize: 70, marginTop: 5}]}>Jumelage</Text>
        <Text style={[styles.midText, {marginBottom: 20}]}>
          Commencez à pédaler pour allumer la machine, puis scannez le qrcode.
        </Text>
      </View>
      {'authorized' !== hasPermission ? (
        <Text>Please allow the app to access your camera.</Text>
      ) : device ? (
        <Camera style={{flex: 2, marginBottom:"25%"}} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5}/>
      ) : (
        <></>
      )}
      <View style={{alignItems: 'center', borderWidth:1, flex:1, position:"absolute", bottom:0, left:"50%"}}>
        <NavApp navigation={props.navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    height: '110%',
  },
  cameracontainer: {
    height: Dimensions.get('screen').height,
    paddingTop: 0,
    marginTop: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    zIndex: 100,
    marginTop: 30,
  },
  textTitle: {
    color: '#5FCDFA',
    textTransform: 'uppercase',
    fontSize: 50,
    fontFamily: 'TallFilms',
  },
  item: {
    width: 80,
    height: 100,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middle: {
    position: 'absolute',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    ...Platform.select({
      ios: {
        height: Dimensions.get('screen').height / 3 + 50,
        top: Dimensions.get('screen').width / 4 + 10,
        width: Dimensions.get('screen').width + 10,
        left: -100,
      },
      android: {
        left: -Dimensions.get('screen').width / 4,
        top: Dimensions.get('screen').width / 4,
        width: Dimensions.get('screen').width,
      },
    }),
  },
  midText: {
    fontFamily: 'GnuolaneRG-Regular',
    color: 'white',
    fontSize: 16,
  },

  fond: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '115%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  footer: {
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 100,
    position: 'absolute',
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        bottom: -18,
      },
      android: {
        backgroundColor: '#05141B',
        bottom: 0,
      },
    }),
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
});
AppRegistry.registerComponent('default', () => ScanScreen);
