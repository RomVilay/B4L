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
              isOpen: false,
              isDisabled: false,
              swipeToClose: true
            };
          }

    render() {
        var BContent = (
              <View style={[styles.btn, styles.btnModal]}>
                <Button title="X" color="white" onPress={() => this.setState({isOpen: false})}/>
              </View>
            );
return (
      <View style={styles.wrapper}>

        <Navigation onPress={() => this.refs.modal4.open()} style={styles.btn}>
                        </Navigation>



        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>

           <View style={[styles.container, { height: '100%', width: '100%' }]}>
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
                                      <Text style={styles.text}>Accueil</Text>
                                  </View>
                                  <View style={styles.item} >
                                      <TouchableHighlight
                                      onPress={() => this.props.navigation.navigate("Parametres")}>
                                          <Image source={require('../../assets/settings.png')}/>
                                       </TouchableHighlight>
                                       <Text style={styles.text}>Paramètres</Text>
                                  </View>
                                  <View style={styles.item}>
                                  <TouchableHighlight
                                  onPress={() => this.props.navigation.navigate("Termes")}>
                                      <Image source={require('../../assets/i.png')}/>
                                   </TouchableHighlight>
                                      <Text style={styles.text}>Termes</Text>
                                  </View>
                               </View>
                          </View>
        </Modal>
        <Modal isOpen={this.state.isOpen}
         onClosed={() => this.setState({isOpen: false})}
        style={[styles.modal, styles.modal4]}
        position={"top"}
        backdropPressToClose={false}
        backdropContent={BContent}
        touchableOpacity={this.state.isOpen}
        >

        </Modal>

      </View>
    );
    }
}

const styles = StyleSheet.create({
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
        zIndex: 100
    },

    item: {
        top: '10%',
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
        alignItems: 'center'
      },

      modal4: {
        backgroundColor:'transparent',
        color:"white",
        flex:1,
        flexDirection:'row'
      },

      btn: {
        color: "white",
        position:'absolute',
        bottom:10,
        left:'10%'
      },

      btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "transparent"
      }
})