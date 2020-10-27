import React from 'react'
import { View, StyleSheet, Image, SafeAreaView } from 'react-native'
import Logo from '../../assets/logo'
import Fingerprint from '../../assets/fingerprint'

export default class Demarrage extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Image
                        style={styles.fond}
                        source={require('../../assets/fond.png')}
                        resizeMode="cover"
                    />
                    <Logo style={styles.logo} />
                    <Fingerprint
                        onPress={() => this.props.navigation.navigate("Connexion")}
                        style={{
                            color: 'white',
                            position: 'absolute',
                            top: 550,
                            fontSize: 30
                        }}
                    />
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
    }
})