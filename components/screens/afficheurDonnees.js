import React from "react";
import {View, ImageBackground, Animated, Text, StyleSheet, TouchableOpacity} from "react-native";
import Fleche from "../../assets/fleche";

export default function AfficheurDonnees (props) {
    const [state,setState] = React.useState({
        kmp: 0,
        kmh: 0,
        kmc: 10,
        watts: 200,
        rpm: 0,
        kcal: 0,
    })
    const prpm = new Animated.ValueXY({x: 0, y: 0});
    const pkcal = new Animated.ValueXY({x: 0, y: 0});
    const pkmh = new Animated.ValueXY({x: 0, y: 0});
    const trans0 = prpm;
    const trans1 = pkcal;
    const trans2 = pkmh;
    let  tab = ['rpm', 'kmh', 'kcals'];
    //animation de déplacement des valeur pour la flèche droite
    const StartTranslateFunction = () => {
        // test de la première valeur du tableau pour savoir quel déplacement effectuer
        if (tab[0] === 'rpm') {
            Animated.parallel([
                Animated.timing(prpm, {
                    toValue: {x: 63, y: 70},
                    duration: 1000,
                }),
                Animated.timing(pkmh, {
                    toValue: {x: 65, y: -55},
                    duration: 1000,
                }),
                Animated.timing(pkcal, {
                    toValue: {x: -110, y: 0},
                    duration: 1000,
                }),
            ]).start();
            //lancement en parallèle de 3 déplacement avec une durée de 1s
        }
        if (tab[0] === 'kcals') {
            Animated.parallel([
                Animated.timing(pkcal, {
                    toValue: {x: -47, y: 72},
                    duration: 1000,
                }),
                Animated.timing(prpm, {
                    toValue: {x: 112, y: 0},
                    duration: 1000,
                }),
                Animated.timing(pkmh, {
                    toValue: {x: -65, y: -80},
                    duration: 1000,
                }),
            ]).start();
        }
        if (tab[0] == 'kmh') {
            Animated.parallel([
                Animated.timing(pkmh, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
                Animated.timing(pkcal, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
                Animated.timing(prpm, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
            ]).start();
        }
        tab = [tab[2], tab[0], tab[1]];
    };
   const ReverseSlider = () => {
        if (tab[0] === 'kmh') {
            Animated.parallel([
                Animated.timing(prpm, {
                    toValue: {x: 63, y: 50},
                    duration: 1000,
                }),
                Animated.timing(pkmh, {
                    toValue: {x: 45, y: -60},
                    duration: 1000,
                }),
                Animated.timing(pkcal, {
                    toValue: {x: -110, y: -10},
                    duration: 1000,
                }),
            ]).start();
        }
        if (tab[0] == 'kcals') {
            Animated.parallel([
                Animated.timing(prpm, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
                Animated.timing(pkmh, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
                Animated.timing(pkcal, {
                    toValue: {x: 0, y: 0},
                    duration: 1000,
                }),
            ]).start();
        }
        if (tab[0] == 'rpm') {
            Animated.parallel([
                Animated.timing(pkcal, {
                    toValue: {x: -39, y: 48},
                    duration: 1000,
                }),
                Animated.timing(prpm, {
                    toValue: {x: 112, y: 0},
                    duration: 1000,
                }),
                Animated.timing(pkmh, {
                    toValue: {x: -65, y: -55},
                    duration: 1000,
                }),
            ]).start();
        }
        //mise à jour du tableau représentant la position des valeur, la première étant la plus à gauche et la dernière celle à droite
        tab = [tab[1], tab[2], tab[0]];
    };
    return(
        <View style={{selfAlign:"center", flex:1, width:500, borderWidth:3}}>
            <View style={styles.midTop}>
                <ImageBackground
                    source={require('../../assets/Accueil/fondBulle.png')}
                    style={[
                        styles.fondBulle,
                        { marginLeft: 80, textAlign: 'center'},
                    ]}>
                    <Animated.View style={[styles.textbloc, trans0.getLayout()]}>
                        <Text style={[styles.midText, {fontSize: 30}]}>
                            {state.rpm}
                        </Text>
                        <Text style={[styles.midText2, {fontSize: 20}]}>rpm</Text>
                    </Animated.View>
                </ImageBackground>
                <ImageBackground
                    source={require('../../assets/Accueil/fondBulle.png')}
                    style={[
                        styles.fondBulle,
                        { marginLeft: '5%'},
                    ]}>
                    <Animated.View style={[styles.textbloc, trans1.getLayout()]}>
                        <Text style={[styles.midText, {fontSize: 30}]}>
                            {state.kcal}
                        </Text>
                        <Text style={[styles.midText2, {fontSize: 20}]}>kcals</Text>
                    </Animated.View>
                </ImageBackground>
            </View>
            <View style={styles.midMid}>
                <TouchableOpacity onPress={ReverseSlider}>
                    <Fleche style={styles.flecheG} />
                </TouchableOpacity>
                <Animated.View
                    style={[styles.textbloc, {margin: 5}, trans2.getLayout()]}>
                    <Text style={[styles.midText, {fontSize: 30}]}>
                        {state.kmh}
                    </Text>
                    <Text style={styles.midText2}>kmh</Text>
                </Animated.View>
                <TouchableOpacity onPress={StartTranslateFunction}>
                    <Fleche style={styles.flecheD} />
                </TouchableOpacity>
            </View>
            <View style={styles.midBot}>
                <View style={styles.textbloc}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.midText, {fontSize: 20}]}>
                            {state.kmp}
                            <Text
                                style={[
                                    styles.midText2,
                                    {color: 'white', marginLeft: '2%'},
                                ]}>
                                {' '}
                                km <Text style={{color: '#5FCDFA'}}>parcourus </Text>
                            </Text>
                        </Text>
                        <Text style={[styles.midText, {fontSize: 20}]}>
                            {state.kmc}{' '}
                            <Text
                                style={[
                                    styles.midText2,
                                    {color: 'white', marginLeft: '2%'},
                                ]}>
                                km <Text style={{color: '#5FCDFA'}}> cumulés</Text>
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        flecheG: {
            marginTop: '5%',
            transform: [{scale: 2}],
            marginRight: 50,
        },
        flecheD: {
            marginTop: '5%',
            transform: [{scale: 2}, {rotate: '180deg'}],
            marginLeft: 60,
            right: '5%',
        },
        fondBulle: {
            borderRadius:50,
            width: 90,
            height: 90,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        textbloc: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        midText: {
            color: 'white',
            fontSize: 12,
            textTransform: 'uppercase',
            fontFamily: 'GnuolaneRG-Regular',
        },
        midText2: {
            color: '#5FCDFA',
            fontSize: 30,
            textTransform: 'uppercase',
            fontFamily: 'TallFilms',
        },
        midTop: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 100,
            marginLeft: '10%',
            paddingTop: '20%',
        },
        midMid: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 100,
            paddingTop: '5%',
            paddingBottom: 20,
            paddingLeft:150,
        },
        midBot: {
            flex: 1,
            alignItems: 'center',
            zIndex: 100,
            marginLeft: 5,
            paddingBottom: '10%'
        }
    }
)
