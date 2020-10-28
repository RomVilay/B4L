import React from 'react'
import { Image, Text, TextInput, View, StyleSheet, SafeAreaView } from 'react-native'

import LogoMed from '../../assets/logoMed'

export default class Connexion extends React.Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Image
                        style={styles.fond}
                        source={require('../../assets/fond.png')}
                        resizeMode="cover"
                    />
                    <LogoMed style={styles.logo} />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.username}
                                style={styles.input}
                                keyboardType='email-address'
                                onChangeText={username => this.setState({ username })}
                                placeholder="Nom d'utilisateur"
                                placeholderTextColor='#FFFFFF'
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.password}
                                style={styles.input}
                                onChangeText={password => this.setState({ password })}
                                placeholder={'Mot de passe'}
                                secureTextEntry={true}
                                placeholderTextColor='#FFFFFF'
                            />
                        </View>
                        <Text
                            onPress={() => this.props.navigation.navigate("Home")}
                            backgroundColor="transparent"
                            style={{
                                color: "#5FCDFA",
                                textTransform: 'uppercase',
                                fontSize: 25,
                                fontFamily: 'DIN Condensed',
                                top: '5%'
                            }}
                        >Connexion</Text>
                    </View>
                    <Text
                        backgroundColor="transparent"
                        style={{
                            color: "white",
                            textTransform: 'uppercase',
                            fontSize: 20,
                            fontFamily: 'DIN Condensed',
                            top: '20%'
                        }}
                    >Pas encore inscrit ?</Text>
                    <Text
                        onPress={() => this.props.navigation.navigate("Inscription")}
                        backgroundColor="transparent"
                        style={{
                            color: "#53B4DC",
                            textTransform: 'uppercase',
                            fontSize: 20,
                            fontFamily: 'DIN Condensed',
                            top: '20%'
                        }}
                    >Cliquez ici</Text>
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

    input: {
        height: 45,
        width: 300,
        fontSize: 20,
        borderRadius: 10,
        textAlign: 'center',
        alignSelf: 'center'
    },

    inputContainer: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        borderColor: '#5FCDFA',
        backgroundColor: '#284462'
    },

    fond: {
        width: '110%',
        height: '120%',
        position: 'absolute'
    },

    logo: {
        position: 'absolute',
        top: '5%'
    }
})