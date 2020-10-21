// Imports Modules
import React from 'react'
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableHighlight, ImageBackground} from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import NavApp from '../screens/NavApp'
import Minuteur from'../objects/Minuteur'
// Imports Components
import SVGCompteurFond from '../../assets/compteurFond'
import FlecheG from "../../assets/flecheG";

export default class Compteur extends React.Component {
    state = {
        kmp: 16.3,
        kmh: 20,
        kmc: 234,
        watts: 200,
        rpm:15,
        kcal:80,
        timer: new Date(),
        start: new Date(),
        isPaused:false
    }
    /*componentDidMount() {
        this.myInterval = setInterval(() => {
            var time = new Date()
            this.setState({timer: time - this.state.start})
        })
    }
    componentWillUnmount(){
        clearInterval(this.myInterval)
    }*/

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.fond}
                    source={require('../../assets/fond.png')}
                />
                <View style={[styles.container, { height: '100%', width: '100%' }]}>
                    <View style={[styles.header, { width: '100%' }]}>
                        <View style={styles.item}>
                              <LogoMin></LogoMin>
                        </View>
                    </View>
                    <View style={[styles.middle, { width: '100%' }]}>
                        <View style={styles.midTop}>
                            <Text style={[styles.midText,{fontSize:30}]}>{this.state.timer.toLocaleTimeString()}</Text>
                            {this.state.isPaused ? <Text></Text> : <Text style={{color: '#5FCDFA', fontSize: 30}}>Pause</Text>}
                        </View>
                        <View style={styles.midMid}>
                         <ImageBackground source={require('../../assets/compteur.png')} style={{width:'120%',height:'100%',right:'8%'}}>
                             <Image source={require('../../assets/aiguille.png')} style={styles.aiguille}/>
                             <Image source={require('../../assets/Ellipse3.png')} style={[styles.aiguille, {position:'absolute', left:'38%', bottom:'25%'}]} />
                                <View style={[styles.midItem, {zIndex:200,  marginTop:40,paddingBottom:'0%' }]}>
                                    <View style={[styles.textbloc,{width:'20%',borderRadius:50}]}>
                                        <ImageBackground source={require('../../assets/fondBulle.png')} style={styles.fondBulle}>
                                            <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.rpm}</Text>
                                            <Text style={[styles.midText2]}>rpm</Text>
                                        </ImageBackground>
                                    </View>
                                    <View style={[styles.textbloc,{width:'20%',borderRadius:50}]}>
                                        <ImageBackground source={require('../../assets/fondBulle.png')} style={styles.fondBulle}>
                                        <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kcal}</Text>
                                        <Text style={styles.midText2}>kcal</Text>
                                        </ImageBackground>
                                    </View>
                                </View>
                             <View style={[styles.midItem, {zIndex:200, padding:'0%',}]}>
                                 <FlecheG style={styles.flecheG}></FlecheG>
                                 <View style={[styles.textbloc, {margin:10}]}>
                                     <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kmh}</Text>
                                     <Text style={styles.midText2}> km/h</Text>
                                 </View>
                                 <FlecheG style={styles.flecheD}></FlecheG>
                             </View>
                             <View style={[styles.midItem, {zIndex:200, paddingTop:'0%'}]}>
                                 <View style={styles.textbloc}>
                                     <View style={{flexDirection:'row'}}>
                                         <Text style={[styles.midText,{ fontSize: 20}]}>{this.state.kmp}</Text>
                                         <Text style={[styles.midText2,{ fontSize: 20}]}>km parcourus </Text>
                                     </View>
                                     <View style={{flexDirection:'row'}}>
                                         <Text style={[styles.midText,{ fontSize: 20}]}>{this.state.kmc}</Text>
                                         <Text style={[styles.midText2,{ fontSize: 20}]}>km cumulés</Text>
                                     </View>
                                 </View>
                             </View>
                         </ImageBackground>
                        </View>
                        <View style={styles.midBot}>
                            <Text>-</Text>
                            <View style={styles.textbloc}>
                                <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.watts}</Text>
                                <Text style={[styles.midText2,{ fontSize: 30}]}>watts </Text>
                            </View>
                            <Text>+</Text>
                        </View>
                    </View>
                    <NavApp style={styles.footer} navigation={this.props.navigation}></NavApp>
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        zIndex: 100,

    },

    item: {
        top: '5%',
        width: 80,
        height: 100,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    middle: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100

    },
    midTop:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,


    },
    midMid: {
        flex: 4,
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
        overflow:'visible',
        paddingRight:'8%',
        borderWidth: 3
    },

    midItem: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
        justifyContent:'center',
        alignContent:'space-around',
        left: '12.5%',
        padding:'8%'

    },

    midBot: {
        flex:1,
        alignItems: 'center',
        zIndex: 100
    },

    midText: {
        color: 'white',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    midText2:{
        color: '#5FCDFA',
        fontSize: 20
    },
    textbloc:{

      flexDirection:'column',
      alignItems:'center',

    },

    fond: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '110%',
        resizeMode: 'cover',
        justifyContent: 'center',

    },
    fondCompteur:{
        borderWidth:3,
        borderColor:'white',
        position:'absolute',
        zIndex:-100,
        top:-110,
        left:'-20%',
        width:50
    },
    aiguille:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        zIndex:0,
        position:'absolute',
        bottom:15,
        left:80
    },
    fondBulle:{
        width:'120%',
        resizeMode: "cover",
        justifyContent: "center",
        paddingLeft:20
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 100,


    },
    flecheG:{
        transform: [{scale:2}],
        marginRight:'5%'
    },
    flecheD:{
        transform: [{scale:2}, {rotate:"180deg"}],
        marginLeft:'5%'
    },
    go: {
        color: '#56ADCE',
        fontSize: 130,
        fontWeight:'bold',
        position: 'absolute',
        zIndex:100,
        top: 10
    }
})