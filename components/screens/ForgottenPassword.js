import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LogoMed from '../../assets/logoMed';
import {APP_TOKEN} from '@env';
import {forgottenPassword} from '../../functions/login';

export default function ForgottenPassword(props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reference, setReference] = useState(null);

  const windowHeight = Dimensions.get('window').height;

  const checkField = async () => {
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    ) {
      Alert.alert('Erreur', "L'adresse e-mail n'est pas valide");
      reference.clear();
      reference.focus();
    } else {
      sendResetPwdEmail();
    }
  };

  const sendResetPwdEmail = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
      setIsLoading(false);
    } else {
      let resetPWD = await forgottenPassword({mail: email}, APP_TOKEN);
      setIsLoading(false);
      if (resetPWD.message) {
        Alert.alert('Erreur', resetPWD.message);
        reference.clear();
        reference.focus();
      } else {
        Alert.alert(
          'Email de réinitialisation du mot de passe envoyé',
          'Un email de réinitialisation du mot de passe a été envoyé à ' +
            email,
        );
        props.navigation.navigate('Connexion', {username: email});
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{height: windowHeight}}
        extraHeight={500}>
        <Image style={styles.fond} source={require('../../assets/fond.png')} />
        <LogoMed style={styles.logo} />
        <Text style={styles.title}>Mot de passe oublié</Text>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              ref={ref => setReference(ref)}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              placeholder={'Indiquez votre adresse e-mail'}
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={{top: 20}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#5FCDFA" />
            ) : (
              <TouchableOpacity onPress={() => checkField()}>
                <Text style={styles.mainBtn}>Récupérer mon mot de passe</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.footerBtn}>Retour</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    width: '100%',
  },
  fond: {
    width: '110%',
    height: '120%',
    position: 'absolute',
  },
  logo: {
    alignSelf: 'center',
    top: '5%',
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    marginTop: 70,
    color: '#5FCDFA',
    fontSize: 50,
    textTransform: 'uppercase',
    fontFamily: 'TallFilms',
    alignSelf: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    textAlign: 'center',
    height: 45,
    fontSize: 20,
    color: 'white',
    borderRadius: 10,
    fontFamily: 'GnuolaneRG-Regular',
  },
  mainBtn: {
    color: '#5FCDFA',
    fontSize: 30,
    textTransform: 'uppercase',
    fontFamily: 'GnuolaneRG-Regular',
  },
  footerBtn: {
    alignSelf: 'center',
    marginBottom: 50,
    color: '#53B4DC',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
});
