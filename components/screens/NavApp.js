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


                    /*<View style={[styles.logos], { width: '100%' }}>
                        <View style={styles.item} onPress={() => this.props.navigation.navigate("Accueil")}>
                            <Image source={require('../../assets/home.png')} />
                            <Text style={styles.text}>Accueil</Text>
                        </View>
                        <View style={styles.item} onPress={() => this.props.navigation.navigate("Parametres")}>
                            <Image source={require('../../assets/settings.png')} />
                            <Text style={styles.text}>Paramètres</Text>
                        </View>
                       <View style={styles.item}>
                         <Image source={require('../../assets/i.png')} onPress={() => this.props.navigation.navigate("Statistiques")}/>
                         <Text style={styles.text}>Statistiques</Text>
                        </View>
                    </View>*/
var screen = Dimensions.get('window');
export default class NavApp extends React.Component {

        constructor() {
            super();
            this.state = {
              isOpen: false,
              isDisabled: false,
              swipeToClose: true,
              sliderValue: 0.3
            };
          }

          onClose() {
            console.log('Modal just closed');
          }

          onOpen() {
            console.log('Modal just opened');
          }

          onClosingState(state) {
            console.log('the open/close of the swipeToClose just changed');
          }
         /* toggleVisibility(){
            return this.state.isOpen ? visibility:false : visibility:true
*/

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
                              ></Navigation_reverse>
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
        backdropContent={BContent}>

        </Modal>

      </View>
    );



    /*
   return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.fond}
                    source={require('../../assets/fond.png')}
                />
                <View style={[styles.container, { height: '100%', width: '100%' }]}>
                    <Navigation_reverse
                        onPress={() => this.props.navigation.goBack()}
                        style={{ top: '2%', marginBottom:10}}
                    ></Navigation_reverse>
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
            </SafeAreaView>)
*/
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 100
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
        height:300,
        width:500,
        zIndex:500
      },

      modal: {
        justifyContent: 'center',
        alignItems: 'center'
      },

      modal4: {
        height: 300,
        backgroundColor:'transparent',
        color:"white",
        flex:1,
        flexDirection:'row'
      },

      btn: {
        color: "white",
        position:'absolute',
        bottom:10,
        left:100
      },

      btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "transparent"
      }
})