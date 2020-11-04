import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    ImageBackground,
    Button,
    Animated,
    TouchableOpacity
} from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import NavApp from '../navigation/NavApp'
// Imports Components
import Fleche from "../../assets/fleche";
import {Stopwatch} from 'react-native-stopwatch-timer'

export default class Compteur extends React.Component {
    constructor(props) {
        super(props);
        this.RotateValueHolder = new Animated.Value(0);
        this.rpm = new Animated.ValueXY({x:0,y:0});
        this.kcal = new Animated.ValueXY({x:0,y:0});
        this.kmh = new Animated.ValueXY({x:0,y:0});
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
        this.tab = ['rpm','kmh','kcals']
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.valueSlider = this.valueSlider.bind(this)
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
    valueSlider(forward){
        if (forward == true){
            this.tab = [this.tab[2],this.tab[0],this.tab[1]]
        }else {
            this.tab = [this.tab[1],this.tab[2],this.tab[0]]
        }
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
    StartTranslateFunction= () =>{
        if (this.tab[0] === 'rpm')
        {
            Animated.parallel([
                Animated.timing(this.rpm, {
                    toValue: {x:63,y:50},
                    duration:1000
                }),
                Animated.timing(this.kmh, {
                    toValue: {x:45,y:-60},
                    duration:1000
                }),
                Animated.timing(this.kcal, {
                    toValue: {x:-110,y:-10},
                    duration:1000
                }),
            ]).start()
        }
        if (this.tab[0] == 'kcals')
        {
            Animated.parallel([
                Animated.timing(this.kcal, {
                    toValue: {x:-39,y:48},
                    duration:1000
                }),
                Animated.timing(this.rpm, {
                    toValue: {x:112,y:0},
                    duration:1000
                }),
                Animated.timing(this.kmh, {
                    toValue: {x:-65,y:-55},
                    duration:1000
                })
            ]).start()
        }
        if (this.tab[0] == 'kmh')
        {
            Animated.parallel([
                Animated.timing(this.kmh, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
                Animated.timing(this.kcal, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
                Animated.timing(this.rpm, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
            ]).start()
        }
        this.tab = [this.tab[2],this.tab[0],this.tab[1]]
    }
    ReverseSlider = () => {
        if (this.tab[0] === 'kmh')
        {
            Animated.parallel([
                Animated.timing(this.rpm, {
                    toValue: {x:63,y:50},
                    duration:1000
                }),
                Animated.timing(this.kmh, {
                    toValue: {x:45,y:-60},
                    duration:1000
                }),
                Animated.timing(this.kcal, {
                    toValue: {x:-110,y:-10},
                    duration:1000
                }),
            ]).start()
        }
        if (this.tab[0] == 'kcals')
        {
            Animated.parallel([
                Animated.timing(this.rpm, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
                Animated.timing(this.kmh, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
                Animated.timing(this.kcal, {
                    toValue: {x:0,y:0},
                    duration:1000
                }),
            ]).start()
        }
        if (this.tab[0] == 'rpm')
        {
            Animated.parallel([
                Animated.timing(this.kcal, {
                    toValue: {x:-39,y:48},
                    duration:1000
                }),
                Animated.timing(this.rpm, {
                    toValue: {x:112,y:0},
                    duration:1000
                }),
                Animated.timing(this.kmh, {
                    toValue: {x:-65,y:-55},
                    duration:1000
                })
            ]).start()
        }
        this.tab = [this.tab[1],this.tab[2],this.tab[0]]
    }
    render() {
        const rotation = this.RotateValueHolder.interpolate({
            inputRange: [ 0, 10],
            outputRange:this.state.outputRange,
        });
        const trans0 = this.rpm
        const trans1 = this.kcal
        const trans2 = this.kmh
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
                        <Text style={{color: '#5FCDFA', fontSize: 30, fontFamily:"TallFilms"}}>{this.state.pause}</Text>
                    </View>
                    <View style={styles.middle} >
                        <ImageBackground source={require('../../assets/Compteur/compteur.png')} style={styles.compteur}>
                            <Animated.Image source={require('../../assets/Compteur/aiguille.png')} style={[{transform:[{rotate:rotation}]}, styles.aiguille]}/>
                            <View style={styles.midTop}>
                                <ImageBackground source={require('../../assets/Accueil/fondBulle.png')} style={[styles.fondBulle,{borderRadius:50, marginLeft:'22%', textAlign:'center'}]}>
                                <Animated.View style={[styles.textbloc,trans0.getLayout()]}>
                                        <Text style={[styles.midText,{ fontSize: 30,}]}>{this.state.rpm}</Text>
                                        <Text style={[styles.midText2,{ fontSize: 20, }]}>rpm</Text>
                                </Animated.View>
                                </ImageBackground>
                                <ImageBackground source={require('../../assets/Accueil/fondBulle.png')} style={[styles.fondBulle,{borderRadius:50, marginLeft:'5%'}]}>
                                <Animated.View style={[styles.textbloc, trans1.getLayout()]}>
                                        <Text style={[styles.midText,{ fontSize: 30, }]}>{this.state.kcal}</Text>
                                        <Text style={[styles.midText2,{ fontSize: 20, }]}>kcals</Text>
                                </Animated.View>
                                </ImageBackground>
                            </View>
                            <View style={styles.midMid} >
                                <TouchableOpacity onPress={this.ReverseSlider} ><Fleche style={styles.flecheG} /></TouchableOpacity>
                                <Animated.View style={[styles.textbloc, {margin:10}, trans2.getLayout()]}>
                                    <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kmh}</Text>
                                    <Text style={styles.midText2}>kmh</Text>
                                </Animated.View>
                                <TouchableOpacity onPress={this.StartTranslateFunction} ><Fleche style={styles.flecheD} /></TouchableOpacity>
                            </View>
                            <View style={styles.midBot} >
                                <View style={styles.textbloc}>
                                    <View style={{flexDirection:'column'}}>
                                        <Text style={[styles.midText,{ fontSize: 20}]}>{this.state.kmp}<Text style={[styles.midText2,{ color:'white',marginLeft:'2%'}]}> km <Text style={{color:"#5FCDFA"}}>parcourus </Text></Text></Text>
                                        <Text style={[styles.midText,{ fontSize: 20}]}>{this.state.kmc} <Text style={[styles.midText2,{  color:'white', marginLeft:'2%'}]}>km <Text style={{color:"#5FCDFA"}}> cumulés</Text></Text></Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>


                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={[{flex:1, flexDirection:"row", marginLeft:'30%', paddingTop:'10%'}]}>
                            <Text style={[styles.midText,{ fontSize: 70, marginRight:'5%'}]}  onPress={() => {this.state.watts -= 5}}>-</Text>
                            <View style={styles.textbloc}>
                                <Text style={[styles.midText,{ fontSize: 70}]}> {this.state.watts} </Text>
                                <Text style={[styles.midText2]}>watts </Text>
                                <TouchableOpacity style={styles.midText2} onPress={() => this.toggleStopwatch()}><Text style={[styles.midText,{fontSize:30}]}>Pause</Text></TouchableOpacity>
                            </View>
                            <Text style={[styles.midText,{ fontSize: 70, marginRight:'5%'}]} onPress={() => {this.state.watts += 5}}>+</Text>
                        </View>

                    </View>
                    <View style={styles.footer}>
                        <NavApp  navigation={this.props.navigation} />
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
        fontSize: 50,
        color: 'white',
        fontFamily: 'GnuolaneRG-Regular'
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
        paddingBottom:'9%'
    },
    stopwatch:{
        backgroundColor:'transparent',
        width:'25%',
        color: 'white',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    middle: {
        flex: 4,
        flexDirection: 'column',
        zIndex: 100
    },
    compteur:{
        flex: 3,
        width:'110%',
        height:'110%',
        right: '10%',
        resizeMode: "cover",
        justifyContent: "center",
        zIndex:0,
    },
    aiguille:{
        top:'22%',
        bottom:'28%',
        width:'45%',
        height:'73%',
        position:'absolute',
        resizeMode:"stretch" ,
        marginLeft:'30%',
        alignContent:'center',
        zIndex:0
    },
    midTop:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
        marginLeft:'10%',
        paddingTop: '20%'
    },
    fondBulle:{
        width:90,
        height:90,
        resizeMode: "cover",
        justifyContent: "center",
    },
    midMid: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
        paddingTop: '5%',
        paddingBottom:'2%',
        paddingLeft: '32%'
    },
    flecheG:{
        marginTop:'5%',
        transform: [{scale:2}],
        marginRight:'20%'
    },
    flecheD:{
        marginTop:'5%',
        transform: [{scale:2}, {rotate:"180deg"}],
        marginLeft:'50%',
        right:'5%'
    },
    midBot: {
        flex:1,
        alignItems: 'center',
        zIndex: 100,
        marginLeft:'12%',
        paddingBottom:'10%',
    },
    footer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
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
        textTransform: 'uppercase',
        fontFamily: 'GnuolaneRG-Regular'
    },
    midText2:{
        color: '#5FCDFA',
        fontSize: 30,
        textTransform:'uppercase',
        fontFamily: 'TallFilms'
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


})