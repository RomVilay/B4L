// Imports Modules
import React from 'react'
import { View, StyleSheet, SafeAreaView, Image, Text } from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import Navigation from '../../assets/navigation'

// Imports Components

var qrcode = require('../../assets/qrcode.png')

export default class Jumelage extends React.Component {
    state = {
        code: qrcode
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
                        <Text style={[styles.textTitle, {fontSize:30}]}>Jumellage</Text>
                    </View>
                    <View style={[styles.middle, { width: '80%' }]}>
                        <View style={styles.midTop}>
                            <Text style={styles.midText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec ut tellus ipsum. Phasellus ac feugiat risus, quis fermentum felis.
                            </Text>
                        </View>
                        <View style={styles.midMid}>
                            <View style={[styles.midItem]}>
                                <Image source={this.state.code}
                                style={{margin:'auto'}}
                                />
                            </View>
                        </View>
                        <View style={[styles.midBot, {marginBottom:'5%'}]}>
                            <Text style={[styles.midText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec ut tellus ipsum. Phasellus ac feugiat risus, quis fermentum felis.</Text>
                        </View>
                    </View>
                    <Navigation
                        onPress={() => this.props.navigation.navigate("NavApp")}
                        style={{ bottom: '5%' }}
                    ></Navigation>
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
        fontSize: 25,
        fontFamily: 'DIN Condensed',
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
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
    },

    midMid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100
    },

    midItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100
    },

    midBot: {
        alignItems: 'center',
        zIndex: 100
    },

    midText: {
        color: 'white',
        fontSize: 16,
        textTransform: 'uppercase'
    },

    fond: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '110%',
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 100,
        bottom: '20%'
    }
})