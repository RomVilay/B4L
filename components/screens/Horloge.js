import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Horloge extends React.Component {
    state = {
        date: new Date()
    }

    callMe() {
        setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000)
    }

    render() {
        return (
            <View>
                <Text style={styles.horloge}>
                    {this.state.date.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })
                        .replace(/(:\d{2}| [AP]M)$/, "")}
                    {this.callMe()}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    horloge: {
        color: '#377895',
        width: 90,
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily:'GnuolaneRG-Regular'
    }
})