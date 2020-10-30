import React from 'react'
import { View, Image, StyleSheet, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native'
import LogoMin from '../../assets/logoMin'
import NavApp from '../navigation/NavApp'

var avatar = require('../../assets/avatar.png')
var flecheG = require('../../assets/flecheG.png')

export default class Parametres extends React.Component {

        state={
        avatar:avatar,
        name: 'Gaston',
        genre:'homme',
        age:'23',
        taille:'170',
        poids:'70',
        partieS:'Tenue',
        parties:['Visage','Coupe','Couleur','Tenue','Accessoire']
        }



    render() {
        console.log(this.state.partieS === this.state.parties[3])

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
                        <View style={styles.midTop}>
                            <Image source={flecheG} />
                            <Image source={this.state.avatar} />
                            <Image source={flecheG} />
                        </View>
                        <View style={[styles.midMid,  {borderBottomWidth:1,borderColor:'white'}]}>
                            {
                                this.state.parties.map(item => (
                                    {item} === 'Tenue' ? <Text style={styles.linesw} key={item}>{item}</Text> : <Text style={styles.linesb} key={item}>{item}</Text>


                                ))
                            }
                         </View>
                         <View style={styles.midBot}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.name}
                                    style={styles.input}
                                    onChangeText={name => this.setState({ name })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.age}
                                    style={styles.input}
                                    onChangeText={age => this.setState({ age })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.taille}
                                   style={styles.input}
                                    onChangeText={taille => this.setState({ taille })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.poids}
                                    style={styles.input}
                                    onChangeText={poids => this.setState({ poids })}
                                    placeholderTextColor='#FFFFFF'/>
                            </View>
                         </View>
                     </View>
                     <View style={styles.footer}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Parametres2")}>
                            <Text style={[styles.textTitle,{fontSize:30}]}>Suivant</Text>
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
         fontSize: 50,
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
         fontSize: 30,
         fontFamily:'TallFilms'
     },
     linesw : {
         color: "white",
         fontSize: 30,
         fontFamily:'TallFilms'
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
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-around',
         zIndex: 100
     },
     midMid: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent:'space-between',
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
             color:'white'
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