import React from 'react'
import {Image, Text, TextInput, View, StyleSheet, SafeAreaView, Alert} from 'react-native'

import LogoMed from '../../assets/logoMed'

export default class Inscription extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2:''
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
                            onChangeText={username => this.setState({ username })}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor='#FFFFFF'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.email}
                            style={styles.input}
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ email })}
                            placeholder='Adresse mail'
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
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.password2}
                            style={styles.input}
                            onChangeText={password2 => this.setState({ password2 })}
                            placeholder={'Validez votre mot de passe'}
                            secureTextEntry={true}
                            placeholderTextColor='#FFFFFF'
                        />
                    </View>
                    <Text
                        onPress={() => this.state.password == this.state.password2 ? this.props.navigation.navigate("Home"): Alert.alert('inscription','veuillez saisir un mot de passe identique',[{text: "fermer"}])}
                        backgroundColor="transparent"
                        style={{
                            color: "#5FCDFA",
                            textTransform: 'uppercase',
                            fontSize: 25,
                            fontFamily: 'DIN Condensed',
                            top: '5%'
                        }}
                    >Inscription</Text>
                </View>
                <Text
                    backgroundColor="transparent"
                    style={{
                        color: "#53B4DC",
                        textTransform: 'uppercase',
                        fontSize: 20,
                        fontFamily: 'DIN Condensed',
                        top: '20%'
                    }}
                >En vous inscrivant, vous acceptez nos</Text>
                <Text
                    onPress={() => this.props.navigation.navigate("Termes")}
                    backgroundColor="transparent"
                    style={{
                        color: "#FFFFFF",
                        textTransform: 'uppercase',
                        fontSize: 20,
                        fontFamily: 'DIN Condensed',
                        top: '20%'
                    }}
                >Termes et conditions</Text>
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