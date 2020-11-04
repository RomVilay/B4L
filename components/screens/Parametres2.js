import React from 'react'
import { View, Image, StyleSheet, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native'
import LogoMin from '../../assets/logoMin'

var avatar = require('../../assets/avatar.png')

export default class Parametres2 extends React.Component {

        state={
        avatar:avatar,
        prenom: 'Gaston',
        nom:'Lagaffe',
        mail:'GL@mail.com',
        password:'Lagaffe',
        password2:'Lagaffe'
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
                               <Text  style={styles.textTitle}>Paramètres</Text>
                    </View>
                    <View style={styles.middle}>
                        <View style={[styles.midTop, {borderBottomWidth:1,borderColor:'white'}]}>
                            <Image source={this.state.avatar} />
                            <Text style={[styles.whiteTitle, {fontSize:40}]}>{this.state.prenom}</Text>
                         </View>
                         <View style={styles.midBot}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.nom}
                                    style={styles.input}
                                    onChangeText={nom => this.setState({ nom })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.prenom}
                                    style={styles.input}
                                    onChangeText={prenom => this.setState({ prenom })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.mail}
                                   style={styles.input}
                                    onChangeText={mail => this.setState({ mail })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.password}
                                    secureTextEntry={true}
                                   style={styles.input}
                                    onChangeText={password => this.setState({ password })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    style={styles.input}
                                    onChangeText={password2 => this.setState({ password2 })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                         </View>
                     </View>
                     <View style={styles.footer}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Parametres3")}>
                            <Text style={styles.textTitle}>Suivant</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Accueil")}>
                            <Text style={styles.linesw}>cacher ces information</Text>
                        </TouchableHighlight>
                     </View>
               </View>
             </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
     container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
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
        fontSize: 70,
        fontFamily:'TallFilms'
    },
    whiteTitle : {
        color: "white",
        textTransform: 'uppercase',
        fontSize: 25,
        fontFamily:'GnuolaneRG-Regular'
    },
    linesb : {
        color: "#5FCDFA",
        fontSize: 17,
        fontFamily:'GnuolaneRG-Regular'
    },
    linesw : {
        color: "white",
        fontSize: 17,
        fontFamily:'GnuolaneRG-Regular'
    },
     middle: {
         flex: 3,
         flexDirection: 'column',
         alignItems: 'stretch',
         justifyContent: 'flex-start',
         zIndex: 100
     },
     midTop: {
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'space-around',
         zIndex: 100
     },
     midMid: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'stretch',
         justifyContent:'center',
         zIndex: 100,
         width:'80%'
     },
    midBot: {
            flex: 2,
            flexDirection: 'column',
            alignItems: 'stretch',
            zIndex: 100
            },
    inputContainer: {
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 5,
            borderColor: '#5FCDFA',
            backgroundColor: '#284462'
        },
      input: {
             height: 45,
             width: 300,
             fontSize: 20,
             borderRadius: 10,
             textAlign: 'center',
             alignSelf: 'center',
             color:'white',
          fontFamily:'GnuolaneRG-Regular'
         },
      footer: {
             flex: 1,
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             zIndex: 100
         },

    fond: {
        width: '100%',
        height: '110%',
        position: 'absolute'
    }
})