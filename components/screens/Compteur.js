import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ImageBackground,
    Image,
    Animated,
    TouchableOpacity,
    Alert,
    Button,
    Dimensions
} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
// Imports Assets
import LogoMin from '../../assets/logoMin'
import NavApp from '../navigation/NavApp'
// Imports Components
import Fleche from "../../assets/fleche";
import {Stopwatch} from 'react-native-stopwatch-timer'
import SegmentedRoundDisplay from "react-native-segmented-round-display/src";
import Svg from "react-native-svg";
import AfficheurCompteur from "./afficheurConpteur";
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
            angle:-150,
            startPosition:-160,
            endPosition:-130,
            outputRange:['0deg','10deg'],
            seg:6,
            up:true
        }
        this.tab = ['rpm','kmh','kcals']
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

    //fonction qui défini la rotation à effectuer
    randomRotation(){
        setInterval( () => {
            if (this.state.up){
                const nend = this.state.endPosition+10
                const ang = `${nend}deg` //définition de la valeur de rotation
                this.setState({startPosition:this.state.endPosition,
                    endPosition:nend ,
                    ///seg:this.state.seg+1,
                    angle:nend })
                if (this.state.endPosition >= -100 ){
                    this.state.up = false
                }
            } else {
                const nend = this.state.endPosition-10
                const ang = `${nend}deg` //définition de la valeur de rotation
                this.setState({startPosition:this.state.endPosition,
                    endPosition:nend ,
                   // seg:this.state.seg-1,
                    angle:nend })
                if (this.state.endPosition <= -135 ){
                    this.state.up = true
                }
            }
        }, 1000) //mise à jour du tableau d'interpolation de la rotation, toutes les 6s
    }
    //déclenchement de l'animation du compteur à l'ouverture de la page
    componentDidMount() {
        this.StartImageRotateFunction();
       this.randomRotation()
    }
    //arrêt de l'animation
    componentWillUnmount() {
        clearInterval(this.randomRotation())
    }
    //fonction animation
    StartImageRotateFunction() {
        this.RotateValueHolder.setValue(this.state.startPosition); //définition de la position de départ pour l'animation
        Animated.timing(this.RotateValueHolder, {
            toValue: this.state.endPosition,
            Easing:'linear',
            duration: 1000
        }).start(() => this.StartImageRotateFunction()); // animation de la rotation, pour une durée de 3s
    }
    //animation de déplacement des valeur pour la flèche droite
    StartTranslateFunction= () =>{
        // test de la première valeur du tableau pour savoir quel déplacement effectuer
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
            //lancement en parallèle de 3 déplacement avec une durée de 1s
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
    //fonction de déplacement des valeur en sens inverse
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
        //mise à jour du tableau représentant la position des valeur, la première étant la plus à gauche et la dernière celle à droite
        this.tab = [this.tab[1],this.tab[2],this.tab[0]]
    }
    //fonction quitter la session
    AlertQuit = () =>
        Alert.alert(
            "",
            "Voulez vous arrêter la session ?",
            [
                {
                    text: "continuer",
                    style: "cancel"
                },
                { text: "quitter la session",
                    onPress: () => this.props.navigation.navigate('Accueil') }
            ],
            { cancelable: false }
        );


    render() {
        //définition du tableau d'interpolation pour la première rotation
        const rotation = this.RotateValueHolder.interpolate({
            inputRange: [ 0, 10],
            outputRange:this.state.outputRange,
        });
        //définition des positions pour les différentes valeurs
        const trans0 = this.rpm
        const trans1 = this.kcal
        const trans2 = this.kmh
        const  example =
            {
                displayValue: false,
                formatValue: (value) => `R$ ${value.toFixed(2)}`,
                radius:120,
                segments: [
                    {
                        total: 80,
                        filled: this.state.endPosition,
                    },
                ],
                emptyArcColor:'transparent',
                incompleteArcColor:'#5FCDFA'
            };
        return (
            <SafeAreaView style={styles.container}>
                <Image source={require('../../assets/fond.png')} style={styles.fond} />
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
                        <TouchableOpacity style={{position: 'absolute', top: 10, left: 10 }} onPress={()=>{ this.AlertQuit()}}><Icon name="power-settings-new" size={40} color="white"  /></TouchableOpacity>
                    </View>
                    <View style={styles.middle} >
                        <ImageBackground source={require('../../assets/Compteur/compteur.png')} style={styles.compteur}>
                            <Animated.Image source={require('../../assets/Compteur/aiguille.png')} style={[{transform:[{rotate:rotation}]}, styles.aiguille]}/>
                            <AfficheurCompteur style={styles.graph} i={this.state.seg}/>
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
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={[{flex:1, flexDirection:"row", marginLeft:'30%'}]}>
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
            </SafeAreaView>
        )
    }
}
//style compteur
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
        width:'40%',
        height:'73%',
        position:'absolute',
        resizeMode:"stretch" ,
        marginLeft:'30%',
        alignContent:'center',
        zIndex:0
    },
    graph:{
        position:"absolute",
        top:0,
        left:65,
        width:Dimensions.get("window").width-55,
        height:350,
        zIndex:500
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