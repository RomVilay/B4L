// Imports Modules
import React from 'react'
import { View, StyleSheet, SafeAreaView, Image, Text, TouchableHighlight } from 'react-native'

// Imports Assets
import LogoMin from '../../assets/logoMin'
import Go from '../../assets/go'
import Cercle from '../../assets/cercle'
import Navigation from '../../assets/navigation'

// Imports Components
import Battery from '../screens/Battery'
import Horloge from '../screens/Horloge'

var avatar = require('../../assets/avatar.png')

export default class Accueil extends React.Component {
    state = {
        name: 'Gaston',
        kcal: '5400',
        km: '234.0',
        watts: '40000',
        avatar: avatar
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
                        <View style={styles.item}>
                        </View>
                        <View style={styles.item}>
                            <LogoMin></LogoMin>
                        </View>
                        <View style={styles.item}>
                            <Battery></Battery>
                            <Horloge></Horloge>
                        </View>
                    </View>
                    <View style={[styles.middle, { width: '100%' }]}>
                        <View style={styles.midTop}>
                            <Text style={[styles.midText, { fontSize: 50 }]}>{this.state.name}</Text>
                        </View>
                        <View style={styles.midMid}>
                            <View style={[styles.midItem]}>
                                <Text style={[styles.midText], { fontSize: 30, color: '#5FCDFA' }}>{this.state.kcal}</Text>
                                <Text style={[styles.midText]}>kcal cumulées</Text>
                            </View>
                            <View style={styles.midItem}>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate("Classements")}>
                                    <Image source={this.state.avatar} />
                                </TouchableHighlight>
                            </View>
                            <View style={[styles.midItem]}>
                                <Text style={[styles.midText], { fontSize: 30, color: '#5FCDFA' }}>{this.state.km}</Text>
                                <Text style={[styles.midText]}>km cumulés</Text>
                            </View>
                        </View>
                        <View style={styles.midBot}>
                            <Text style={[styles.midText], { fontSize: 30, color: '#5FCDFA' }}>{this.state.watts}</Text>
                            <Text style={[styles.midText]}>wh produits</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Cercle></Cercle>
                        <Text style={styles.go} onPress={() => this.props.navigation.navigate("Defis")}>GO</Text>
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
        bottom: '20%'
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
        fontSize: 12,
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