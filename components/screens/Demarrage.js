import React from 'react'
import {View, StyleSheet, Image, SafeAreaView, StatusBar, Text} from 'react-native'
import Logo from '../../assets/logo'
import Fingerprint from '../../assets/fingerprint'
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Demarrage extends React.Component {
    render() {
        const fp = <Fingerprint
            onPress={() => this.props.navigation.navigate("Connexion")}
            style={{
                color: 'white',
                position: 'absolute',
                top: 550,
                fontSize: 30
            }}
            // <Icon name="home"  color="white" style={{position: 'absolute', top: 550, fontSize: 70}} onPress={() => this.props.navigation.navigate("Connexion")}/>
        />
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle= "light-content"
                    hidden={false}
                    translucent={true}
                    backgroundColor="transparent"
                    networkActivityIndicatorVisible={true}
                    />
                <View style={styles.container}>
                    <Image
                        style={styles.fond}
                        source={require('../../assets/fond.png')}
                        resizeMode="cover"
                    />
                    <Logo style={styles.logo} />
                   <Text style={styles.text}>Start</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    fond: {
        width: '110%',
        height: '120%',
        position: 'absolute'
    },

    logo: {
        position: 'absolute',
        top: 150
    },
    text:{
        color: '#5FCDFA',
        fontSize: 70,
        textTransform:'uppercase',
        fontFamily: 'TallFilms',
        position: 'absolute',
        top: 550,
    },
})