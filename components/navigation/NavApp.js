// Imports Modules
import React from 'react'
import { StyleSheet, SafeAreaView, Image, View, Text, TouchableHighlight , ImageBackground, Button, Dimensions, TextInput, ScrollView} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import Modal from 'react-native-modalbox'
import Navigation from '../../assets/navigation'

import Accueil from '../screens/Accueil.js'
import Termes from '../screens/Termes.js'
import Parametres from '../screens/Parametres.js'

import Navigation_reverse from '../../assets/navigation_reverse'

var screen = Dimensions.get('window');
export default class NavApp extends React.Component {

        constructor() {
            super();
            this.state = {
              isOpen: true,
              isDisabled: false,
              swipeToClose: true
            };
          }

    render() {
        return (
      <View style={styles.wrapper}>
        <Navigation onPress={() => this.refs.modal.open()} style={styles.btn} />
        <Modal style={styles.modal} position={"bottom"} ref={"modal"}>
           <View style={styles.container}>
               <Navigation_reverse
                                  onPress={() => this.setState({isOpen: false})}
                                  style={{ top: '2%', marginBottom:10}}
                />
               <View style={[styles.logos, { width: '100%' }]}>
                  <View style={styles.item} >
                        <TouchableHighlight
                               onPress={() => this.props.navigation.navigate("Accueil")}>
                                   <Image source={require('../../assets/home.png')}/>
                        </TouchableHighlight>
                  </View>
                  <View style={styles.item} >
                      <TouchableHighlight
                       onPress={() => this.props.navigation.navigate("Parametres")}>
                          <Image source={require('../../assets/settings.png')}/>
                      </TouchableHighlight>
                  </View>
                  <View style={styles.item}>
                      <TouchableHighlight
                          onPress={() => this.props.navigation.navigate("Termes")}>
                          <Image source={require('../../assets/i.png')}/>
                      </TouchableHighlight>
                  </View>
               </View>
         </View>
        </Modal>
      </View>
    );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        position:'absolute',
        bottom:0,
        height:'18%',
        width:500,
        zIndex:500
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'transparent',
        color:"white",
        flex:1,
        flexDirection:'row'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        zIndex: 100,
    },

    logos: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginBottom:'5%',
        zIndex: 100
    },

    item: {
        width: 80,
        height: 50,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: 'white'
    },

    fond: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '20%',
        resizeMode: 'cover',
        justifyContent: 'center'
    },
      btn: {
        color: "white",
        position:'absolute',
        bottom:10,
        left:'20%'
      },

      btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "transparent"
      }
})