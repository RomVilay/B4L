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
import FlecheG from "../../assets/flecheG";
import {Stopwatch} from 'react-native-stopwatch-timer'

export default class Compteur extends React.Component {
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
                        <Text style={{color: '#5FCDFA', fontSize: 30, fontFamily:"TallFilms"}}>{this.state.pause}</Text>
                    </View>
                    <View style={styles.middle} >
                        <ImageBackground source={require('../../assets/compteur.png')} style={styles.compteur}>
                            <Animated.Image source={require('../../assets/aig.png')} style={[{transform:[{rotate:rotation}], position:'absolute',resizeMode:"stretch" , marginLeft:'15.5%',top:'6.5%',alignContent:'center', zIndex:0  }]}/>
                            <View style={styles.midTop}>
                                <View style={[styles.textbloc,{width:'20%',borderRadius:50, marginLeft:'30%'}]}>
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
                            <View style={styles.midMid} >
                                <FlecheG style={styles.flecheG} />
                                <View style={[styles.textbloc, {margin:10}]}>
                                    <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kmh}</Text>
                                    <Text style={styles.midText2}> km/h</Text>
                                </View>
                                <FlecheG style={styles.flecheD} />
                            </View>
                            <View style={styles.midBot} >
                                <View style={styles.textbloc}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kmp}</Text>
                                        <Text style={[styles.midText2,{ color:'white',marginLeft:'2%'}]}>km <Text style={{color:"#5FCDFA"}}>parcourus </Text></Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.kmc}</Text>
                                        <Text style={[styles.midText2,{  color:'white', marginLeft:'2%'}]}>km <Text style={{color:"#5FCDFA"}}> cumulés</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={[{flex:1, flexDirection:"row", marginLeft:'30%'}]}>
                            <Text style={[styles.midText,{ fontSize: 70, marginRight:'5%'}]}  onPress={() => {this.state.watts -= 5}}>-</Text>
                            <View style={styles.textbloc}>
                                <Text style={[styles.midText,{ fontSize: 30}]}>{this.state.watts}</Text>
                                <Text style={[styles.midText2]}>watts </Text>
                                <TouchableOpacity style={styles.midText2} onPress={() => this.toggleStopwatch()} color={"white"}><Text style={[styles.midText,{fontSize:30}]}>Pause</Text></TouchableOpacity>
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
        fontSize: 30,
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
        padding:5
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
    midTop:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
        paddingBottom:0,
        marginLeft:'10%'
    },
    fondBulle:{
        width:'120%',
        resizeMode: "cover",
        justifyContent: "center",
        paddingLeft:20
    },
    midMid: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
        paddingLeft: '30%',
        marginLeft:'12%'
    },
    flecheG:{
        transform: [{scale:2}],
        marginRight:'5%'
    },
    flecheD:{
        transform: [{scale:2}, {rotate:"180deg"}],
        marginLeft:'5%'
    },
    midBot: {
        flex:1,
        alignItems: 'center',
        zIndex: 100,
        marginLeft:'12%'
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