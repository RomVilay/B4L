import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default class Statistiques extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.fond}
                    source={require('../../assets/fond.png')}
                    resizeMode="cover"
                />
                <Text
                    style={{
                        color: "white"
                    }}
                >
                    Statistiques
                </Text>
            </View>
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
        width: '100%',
        height: '110%',
        position: 'absolute'
    }
})