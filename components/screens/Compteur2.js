import React from 'react'
import {View, StyleSheet, SafeAreaView, Image, Text, ImageBackground, Button, Animated} from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import NavApp from '../navigation/NavApp'
// Imports Components
import FlecheG from "../../assets/flecheG";
import {Stopwatch} from 'react-native-stopwatch-timer'

export default class Compteur2 extends React.Component {
    constructor(props) {
        super(props);
        this.RotateValueHolder = new Animated.Value(0);
        this.state = {
            kmp: 16.3,
            kmh: 20,
            kmc: 234,
            watts: 200,
            rpm:15,
            kcal:80,
            start:true,
            reset:false,
            pause: "",
            time:"",
            startPosition:-3,
            endPosition:2,
            outputRange:['0deg','10deg']
        }
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);

    }
    toggleStopwatch() {
        this.setState({start: !this.state.start, reset: false});
        this.state.pause == "" ? this.setState({pause:"Pause"}) : this.setState({pause:""})
    }
    resetStopwatch() {
        this.setState({start: false, reset: true});
    }
    getFormattedTime(time) {
        this.currentTime = time;
    }


    componentDidMount() {
        this.StartImageRotateFunction();
        setInterval( () => {
            const nend = Math.floor(Math.random() * 50)
            const ang = `${nend}deg`
            this.setState({startPosition:this.state.endPosition,
                endPosition:nend ,
                outputRange: this.state.outputRange[1]<ang ? [this.state.outputRange[1], ang] : [ang,this.state.outputRange[1]]})
            //this.setState({ :Math.random()*10})
        }, 6000)
    }
    StartImageRotateFunction() {
        this.RotateValueHolder.setValue(this.state.startPosition);
        Animated.timing(this.RotateValueHolder, {
            toValue: this.state.endPosition,
            Easing:'linear',
            duration: 3000
        }).start(() => this.StartImageRotateFunction());
    }

    render() {
        const rotation = this.RotateValueHolder.interpolate({
            inputRange: [ 0, 10],
            outputRange:this.state.outputRange,
        });

        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/fond.png')} style={{flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"}}>
                    <View style={styles.header} >
                        <LogoMin></LogoMin>
                        <Stopwatch
                            start={this.state.start}
                            reset={this.state.reset}
                            options={options}
                            getTime={this.getFormattedTime}
                            msec={true}
                        />
                        <Text style={{color: '#5FCDFA', fontSize: 30}}>{this.state.pause}</Text>
                    </View>
                    <View style={styles.middle} >
                        <ImageBackground source={require('../../assets/compteur.png')} style={styles.aiguille}>
                            <Animated.Image source={require('../../assets/aiguille.png')} style={[{transform:[{rotate:rotation}], resizeMode:"stretch" , left:'8%'  }]}/>
                            <Image source={require('../../assets/ellipseFond.png')} style={[styles.aiguille, {position:'absolute', left:'25%', bottom:'28%'}]} />
                        </ImageBackground>
                    </View>
                    <View style={styles.footer} >

                    </View>
                </ImageBackground>
            </SafeAreaView>
            )
        }
    }
    const options = {
        container: {
            width: 220,
            marginLeft:'22%'
            },
        text: {
            fontSize: 30,
            color: 'white'
        }
        }

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    zIndex: 100
    },

    header: {
        flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    padding:5,
    borderWidth: 3
    },
    middle: {
        flex: 4,
        flexDirection: 'column',
        zIndex: 100,
        borderWidth:3
     },
    midTop:{
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,

        },
        midMid: {
            height:'60%',
            width:'100%',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 100,
            overflow:'visible',
            paddingRight:'8%'
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
            height:'10%',
            alignItems: 'center',
            zIndex: 100
        },
        footer: {
            flex: 1,
            width:'100%',
            zIndex: 100,
            borderWidth:3
        },
    stopwatch:{
        backgroundColor:'transparent',
        width:'25%',
        color: 'white',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    item: {
        width: 80,
        height: 80,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:0
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
        zIndex:0
    },
    fondBulle:{
    width:'120%',
    resizeMode: "cover",
    justifyContent: "center",
    paddingLeft:20
    },
    flecheG:{
    transform: [{scale:2}],
    marginRight:'5%'
    },
    flecheD:{
    transform: [{scale:2}, {rotate:"180deg"}],
    marginLeft:'5%'
    }
    })