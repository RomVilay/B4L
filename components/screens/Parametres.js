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
import NavApp from '../navigation/NavApp'
import Fleche from "../../assets/fleche";

var avatar = require('../../assets/avatar.png')

export default class Parametres extends React.Component {

        state={
        avatar:avatar,
        name: 'Gaston',
        genre:'homme',
        age:'23',
        taille:'170',
        poids:'70',
        selection:'Tenue',
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
                            <TouchableOpacity onPress={() =>{console.log('gauche')}} ><Fleche /></TouchableOpacity>
                            <Image source={this.state.avatar} />
                            <TouchableOpacity onPress={() => {console.log('droite')}} ><Fleche style={{transform:[{rotate:'180deg'}]}}/></TouchableOpacity>
                        </View>
                        <View style={[styles.midMid,  {borderBottomWidth:1,borderColor:'white'}]}>
                            {
                                this.state.parties.map(item => (item == this.state.selection  ?
                                        <View style={{flexDirection:'row'}} key={item}>
                                            <Text style={styles.linesw}>{item}</Text>
                                            <View key={item} style={item !== 'Accessoire' ? {width:5, height:5, backgroundColor:'#5FCDFA', top:'25%', left:'6%'} : {width:5, height:5,opacity:0}}/>
                                        </View>
                                        : <View style={{flexDirection:'row'}} key={item}>
                                            <TouchableOpacity onPress={ () => {this.setState({selection:item})}}>
                                                <Text style={styles.linesb}>{item}</Text>
                                            </TouchableOpacity>
                                            <View style={item !== 'Accessoire' ? {width:5, height:5, backgroundColor:'#5FCDFA', top:'25%', left:'6%'} : {width:5, height:5,opacity:0}}/>
                                        </View>


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
                            <Text style={[styles.textTitle,{fontSize:60}]}>Suivant</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
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
         marginTop:10,
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
             color:'white',
             fontFamily:'GnuolaneRG-Regular'
         },
      footer: {
         marginTop: 50,
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