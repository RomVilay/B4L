import React from 'react'
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native'

import Navigation from '../../assets/navigation'

import LogoMin from '../../assets/logoMin'
import P1 from '../../assets/Classement/p1'
import NavApp from "../navigation/NavApp";

var avatar = require('../../assets/avatar.png')
var scnd = require('../../assets/Classement/scnd.png')
var third = require('../../assets/Classement/third.png')


export default class Classements extends React.Component {

    state = {
            name: 'Gaston',
            categorie: 'Homme',
            position: 212,
            membres: 206,
            membre1:'Yann33',
            membre2:'Rémi12',
            membre3:'Chris',
            avatar: avatar
        }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.fond}
                    source={require('../../assets/fond.png')}
                />
                <View style={[styles.container, { height: '100%', width: '100%' }]}>
                    <View style={[styles.header, { width: '100%' }]}>
                            <LogoMin></LogoMin>
                              <Text  style={[styles.textTitle, {fontSize:70}]}>Classement</Text>
                    </View>
                    <View style={[styles.middle, { width: '100%'}]}>
                        <Text style={styles.inputContainer}>Catégorie</Text>
                        <View style={styles.midMid}>
                            <View style={styles.midItem}>
                                <Image source={this.state.avatar} />
                            </View>
                            <View style={[styles.midItem]}>
                                <Text style={[styles.username]}>{this.state.name}</Text>
                            </View>

                        </View>
                        <View style={styles.midMid}><Text style={styles.number}>{this.state.position}</Text>
                            <Text style={styles.linesb}> ème sur </Text>
                            <Text style={styles.number}>{this.state.membres} </Text>
                            <Text style={styles.linesb}> utilisateurs</Text>
                         </View>
                        <View><TouchableOpacity onPress={ () => {this.props.navigation.navigate('Statistiques')}} ><Text style={styles.linesw}>voir tes stats</Text></TouchableOpacity></View>
                    </View>
                    <View style={[styles.middle, {width: '100%'}]}>
                       <View style={[styles.midMid, {borderColor:'white',borderTopWidth:2}]}>
                             <Text style={styles.linesb}> classement dans ta catégorie </Text>
                        </View>
                         <View style={styles.midMid}>
                             <View style={styles.midItem}>
                                <P1 />
                                <View><Text style={[styles.linesb, {fontSize: 20}]}>{this.state.membre1}</Text></View>
                                 <View>
                                     <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Statistiques')}} >
                                         <Text style={[styles.linesw, {fontSize: 20}]}>voir ses stats</Text>
                                     </TouchableOpacity></View>
                             </View>
                        </View>
                        <View style={styles.midMid}>
                             <View style={styles.midItem}>
                                 <Image
                                     source={scnd}
                                     style={{
                                         resizeMode:'contain',
                                         height:60
                                     }}
                                 />
                                <View><Text style={[styles.linesb, {fontSize: 20}]}>{this.state.membre2}</Text></View>
                                 <View>
                                     <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Statistiques')}} >
                                         <Text style={[styles.linesw, {fontSize: 20}]}>voir ses stats</Text>
                                     </TouchableOpacity></View>
                             </View>
                             <View style={styles.midItem}>
                             <Image
                                source={require('../../assets/Classement/third.png')}
                                style={{
                                    resizeMode:'contain',
                                    height:60
                                }}
                                />
                                <View><Text style={[styles.linesb, {fontSize: 20}]}>{this.state.membre3}</Text></View>
                                 <View>
                                     <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Statistiques')}} >
                                         <Text style={[styles.linesw, {fontSize: 20}]}>voir ses stats</Text></TouchableOpacity></View>
                             </View>
                        </View>
                        <View style={styles.footer} >
                            <NavApp  navigation={this.props.navigation} />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
     container: {
            flex:1,
             alignItems: 'center',
             justifyContent: 'center'
         },

      header: {
             flex: 1,
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             zIndex: 100,
         },
     textTitle: {

            color: "#5FCDFA",
            textTransform: 'uppercase',
            fontSize: 25,
         fontFamily:'TallFilms',
                },
     middle: {
              flex: 2,
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 100,

          },
       midMid: {
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 100
          },
          midItem: {
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 100,
                  top:0
              },
          midImage:{
                height:25,
                width:15
          },
        username : {
            color: "white",
            textTransform: 'uppercase',
            fontSize: 25,
            fontFamily:'GnuolaneRG-Regular',
        },
        number : {
            color: "white",
            fontWeight: 'bold',
            fontSize: 25,
            fontFamily:'GnuolaneRG-Regular',
        },
        linesb : {
            color: "#5FCDFA",
            fontSize: 25,
            fontFamily:'GnuolaneRG-Regular',
        },
        linesw : {
                    color: "white",
                    fontSize: 25,
            fontFamily:'GnuolaneRG-Regular',
                },
     inputContainer: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        borderColor: '#5FCDFA',
        backgroundColor: '#284462',
        width: 300,
        fontSize: 20,
        color:'white',
        textAlign:'center',
         fontFamily: 'GnuolaneRG-Regular'
                    },
    footer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fond: {
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '200%',
            resizeMode: 'cover',
            justifyContent: 'center'
        }
})