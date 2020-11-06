import React from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import LogoMin from '../../assets/logoMin'
import Fleche from "../../assets/fleche";

var avatar = require('../../assets/avatar.png')

export default class Parametres3 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            avatar:avatar,
            login: 'Gaston',
            password:'Lagaffe',
            distances:['km','miles'],
            poids:['kg','pounds']
        }
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
                            <Text style={[styles.whiteTitle, {fontSize:40, marginTop:10, marginBottom:10 }]}>{this.state.login}</Text>
                         </View>
                         <View style={styles.midBot}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.login}
                                    style={styles.input}
                                    onChangeText={login => this.setState({ login })}
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
                            <Text style={[styles.linesb,{alignSelf:'center'}]}>Unités</Text>
                             <View style={[styles.inputContainer,{zIndex:100, alignContent:'center', justifyContent:'space-around',flexDirection:'row',height:40,paddingTop:10 }]}>
                                  <TouchableOpacity
                                     onPress={() => { this.setState({distances:[this.state.distances[1],this.state.distances[0]]})}}>
                                     <Fleche style={{}}/>
                                 </TouchableOpacity>
                                 <Text style={styles.linesw}>{this.state.distances[0]}</Text>
                                 <TouchableOpacity
                                     onPress={() => { this.setState({distances:[this.state.distances[1],this.state.distances[0]]})}}>
                                     <Fleche style={{transform:[{rotate:'180deg'}]}}/>
                                 </TouchableOpacity>
                             </View>
                            <View style={[styles.inputContainer,{zIndex:100,alignContent:'center', justifyContent:'space-around',height:40, flexDirection:'row',paddingTop:10}]}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({poids:[this.state.poids[1],this.state.poids[0]]})}}>
                                    <Fleche style={{ }}/>
                                </TouchableOpacity>
                                <Text style={styles.linesw}>{this.state.poids[0]}</Text>
                                <TouchableOpacity
                                    onPress={() => { this.setState({poids:[this.state.poids[1],this.state.poids[0]]})}}>
                                    <Fleche style={{ transform:[{rotate:'180deg'}]}}/>
                                </TouchableOpacity>
                            </View>
                         </View>
                     </View>
                     <View style={styles.footer}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Parametres")}>
                            <Text style={styles.textTitle}>suivant</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Accueil')}>
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