import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//imports colors
import color0 from '../../assets/img-avatar/color0.png'
import color1 from '../../assets/img-avatar/color1.png'
import color2 from '../../assets/img-avatar/color2.png'

//imports casque
import casque0 from '../../assets/img-avatar/casque0.png'
import casque1 from '../../assets/img-avatar/casque1.png'
import casque2 from '../../assets/img-avatar/casque2.png'
import casque3 from '../../assets/img-avatar/casque3.png'
import casque4 from '../../assets/img-avatar/casque2.png'
import casque5 from '../../assets/img-avatar/casque5.png'
import casque6 from '../../assets/img-avatar/casque6.png'
import casque7 from '../../assets/img-avatar/casque7.png'

//imports tenue
import tenue0 from '../../assets/img-avatar/tenue0.png'
import tenue1 from '../../assets/img-avatar/tenue1.png'
import tenue2 from '../../assets/img-avatar/tenue2.png'
import tenue3 from '../../assets/img-avatar/tenue3.png'
import tenue4 from '../../assets/img-avatar/tenue4.png'
import tenue5 from '../../assets/img-avatar/tenue5.png'
import tenue6 from '../../assets/img-avatar/tenue6.png'
import tenue7 from '../../assets/img-avatar/tenue7.png'

//imports visage
import visage0 from '../../assets/img-avatar/visage0.png'
import visage1 from '../../assets/img-avatar/visage1.png'
import visage2 from '../../assets/img-avatar/visage2.png'
import visage3 from '../../assets/img-avatar/visage3.png'

//imports coupe
import coupe0 from '../../assets/img-avatar/coupe0.png'
import coupe1 from '../../assets/img-avatar/coupe1.png'
import coupe2 from '../../assets/img-avatar/coupe2.png'
import coupe3 from '../../assets/img-avatar/coupe3.png'
import coupe4 from '../../assets/img-avatar/coupe4.png'
import coupe5 from '../../assets/img-avatar/coupe5.png'
import coupe6 from '../../assets/img-avatar/coupe6.png'
import coupe7 from '../../assets/img-avatar/coupe7.png'
import coupe8 from '../../assets/img-avatar/coupe8.png'

import {Context} from '../utils/Store';
import goTo from '../utils/navFunctions';
import {editUser} from '../../functions/user';
import LogoMin from '../../assets/logoMin';
import Fleche from '../../assets/fleche';
import avatar from '../../assets/avatar.png';
import NavApp from '../navigation/NavApp';


export default function Parametres(props) {
  const [state, setState] = useContext(Context);
  const [parties] = useState([
    'Visage',
    'Coupe',
    'Teint',
    'Tenue',
    'Casque',
  ]);
  const couleurs = [color0,color1,color2]
  const tenues = [tenue0,tenue1,tenue2,tenue3,tenue4,tenue5,tenue6,tenue7]
  const casques = [casque0,casque1,casque2,casque3,casque4,casque5,casque6,casque7]
  const visages = [visage0,visage1,visage2,visage3]
  const coupes = [coupe0,coupe1,coupe2,coupe3,coupe4,coupe5,coupe6,coupe7,coupe8]
  const [selection, setSelection] = useState('Visage');
  const [isLoading, setIsLoading] = useState(false);
  const [tempDateNaissance, setTempDateNaissance] = useState(
    state.user.dateNaissance || '',
  );
  const [tempTaille, setTempTaille] = useState(state.user.taille || '');
  const [tempPoids, setTempPoids] = useState(state.user.poids || '');
  const [avatar, setAvatar] = useState(state.user.avatar ||"03940")

  const checkFields = () => {
    if (
      !tempDateNaissance.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/) &&
      tempDateNaissance.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir un date de naissance valide`);
    } else if (
      !tempTaille.match(/^[0-9]{1,4}\,{0,1}[0-9]{0,2}$/) &&
      tempTaille.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir une taille valide`);
    } else if (
      !tempPoids.match(/^[0-9]{1,4}\,{0,1}[0-9]{0,2}$/) &&
      tempPoids.length > 0
    ) {
      Alert.alert('Erreur', `Veuillez saisir un poids valide`);
    } else {
      updateUser();
    }
  };

  const updateUser = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      const updated = await editUser(
        state.user.username,
        {
          dateNaissance: tempDateNaissance,
          poids: tempPoids,
          taille: tempTaille,
          avatar: avatar
        },
        // ADMIN_TOKEN,
        state.token,
      );
      setIsLoading(false);
      // console.log('updated : ', updated);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
      } else {
        setState({user: updated, token: state.token});
        goTo(props);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <KeyboardAwareScrollView style={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          <LogoMin />
          <Text style={styles.textTitle}>{state.user.username}</Text>
        </View>
        {/* FIN HEADER */}

        {/* MID  flèche gauche*/}
        <View style={styles.middle}>
          <View style={styles.midTop}>
            <TouchableOpacity
              onPress={() => {
                switch (selection){
                  case "Visage":
                    let s = ""
                    avatar.charAt(4) > 0 ?
                        s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+(parseInt(avatar.charAt(4))-1)
                        :  s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+"3"
                    setAvatar(s)
                    break;
                  case "Coupe":
                     s = ""
                    avatar.charAt(3) > 0 ?
                        s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+(parseInt(avatar.charAt(3))-1)+avatar.charAt(4)
                        :  s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+"8"+avatar.charAt(4)
                    setAvatar(s)
                    break;
                  case "Couleur":
                     s = ""
                   avatar.charAt(0) > 0 ?
                       s = (parseInt(avatar.charAt(0))-1)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                       :  s = "2"+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                      setAvatar(s)
                        break;
                  case 'Accessoire':
                    avatar.charAt(2) > 0 ?
                        s = avatar.charAt(0)+avatar.charAt(1)+(parseInt(avatar.charAt(2))-1)+avatar.charAt(3)+avatar.charAt(4) :
                        s = avatar.charAt(0)+avatar.charAt(1)+"2"+avatar.charAt(3)+avatar.charAt(4)
                    setAvatar(s)
                    break;
                  case   'Tenue':
                    avatar.charAt(1) > 0 ?
                        s = avatar.charAt(0)+(parseInt(avatar.charAt(1))-1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                        : s = avatar.charAt(0)+"7"+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                    setAvatar(s)
                      s=""
                      break;
                  default:
                        break;
                }
              }}>
              <Fleche />
            </TouchableOpacity>
            <View>
              <Image source={couleurs[avatar.charAt(0)]} style={{width:80, height:80}}/>
              <Image source={tenues[avatar.charAt(1)]} style={{width:80, height:32,position:"absolute", top:47, left:0}}/>
              <Image source={visages[avatar.charAt(4)]} style={{width:35, height:25, position:"absolute", top:10, left:22}}/>
              <Image source={coupes[avatar.charAt(3)]} style={{width:60, height:60, position:"absolute", top:-22, left:10}}/>
              <Image source={casques[avatar.charAt(2)]} style={{width:60, height:60, position:"absolute", top:-20, left:10}}/>

            </View>
            {/*<Image source={avatar} flèche drouate />*/}
            <TouchableOpacity
              onPress={() => {
                switch (selection){
                  case "Visage":
                    let s = ""
                    avatar.charAt(4) < 3?
                        s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+(parseInt(avatar.charAt(4))+1)
                        :  s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+"0"
                    setAvatar(s)
                    break;
                  case "Coupe":
                    let c = parseInt(avatar.charAt(3))+1
                    avatar.charAt(3) < 8 ?
                        s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+(parseInt(avatar.charAt(3))+1)+avatar.charAt(4)
                        :  s = avatar.charAt(0)+avatar.charAt(1)+avatar.charAt(2)+"0"+avatar.charAt(4)
                    setAvatar(s)
                    break;
                  case "Couleur":
                    s = ""
                    avatar.charAt(0) < 2  ?
                        s = (parseInt(avatar.charAt(0))+1)+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                        :  s = "0"+avatar.charAt(1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                    setAvatar(s)
                    break;
                  case 'Accessoire':
                    avatar.charAt(2) < 7 ?  s = avatar.charAt(0)+avatar.charAt(1)+(parseInt(avatar.charAt(2))+1)+avatar.charAt(3)+avatar.charAt(4)
                        : s = avatar.charAt(0)+avatar.charAt(1)+"0"+avatar.charAt(3)+avatar.charAt(4)
                    setAvatar(s)
                    break;
                  case   'Tenue':
                    avatar.charAt(1) < 7 ?
                        s = avatar.charAt(0)+(parseInt(avatar.charAt(1))+1)+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                        : s = avatar.charAt(0)+"0"+avatar.charAt(2)+avatar.charAt(3)+avatar.charAt(4)
                    setAvatar(s)
                    s=""
                    break;
                  default:
                    break;
              }
              }

              }>
              <Fleche
                style={{
                  transform: [{rotate: '180deg'}],
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.midMid}>
            <View style={styles.inlineItems}>
              {parties.map(item => (
                <React.Fragment key={item}>
                  <View>
                    {item != selection ? (
                      <TouchableOpacity
                        onPress={() => {
                          setSelection(item);
                        }}>
                        <Text style={styles.linesw}>{item}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.linesb}>{item}</Text>
                    )}
                  </View>
                  {item !== parties[parties.length - 1] ? (
                    <View style={styles.separator} />
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          </View>
          <View style={styles.midBot}>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempDateNaissance}
                style={styles.input}
                onChangeText={dateNaissance =>
                  setTempDateNaissance(dateNaissance)
                }
                placeholder="Indiquez date de naissance"
                placeholderTextColor="#b8b8b8"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempTaille}
                style={styles.input}
                onChangeText={taille => setTempTaille(taille)}
                placeholder="Indiquez votre taille"
                placeholderTextColor="#b8b8b8"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={tempPoids}
                style={styles.input}
                onChangeText={poids => setTempPoids(poids)}
                placeholder="Indiquez votre poids"
                placeholderTextColor="#b8b8b8"
              />
            </View>
          </View>
        </View>
        {/* FIN MID */}

        {/* FOOTER */}
        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#5FCDFA"
              style={{top: '10%'}}
            />
          ) : (
            <TouchableOpacity onPress={() => checkFields()}>
              <Text style={[styles.suivant]}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* FIN FOOTER */}
      </KeyboardAwareScrollView>
      <NavApp style={styles.navApp} navigation={props.navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  textTitle: {
    top: '10%',
    color: '#FFFF',
    textTransform: 'uppercase',
    fontSize: 45,
    fontFamily: 'GnuolaneRG-Regular',
  },
  middle: {
    marginTop: '5%',
    marginBottom: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 100,
    width: '100%',
  },
  midTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100,
    width: '80%',
    marginBottom: '5%',
  },
  midMid: {
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    width: '80%',
    paddingBottom: '3%',
    marginBottom: '5%',
  },
  midBot: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
  },
  inlineItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    width: 5,
    height: 5,
    backgroundColor: '#5FCDFA',
  },
  whiteTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
  linesb: {
    color: '#5FCDFA',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  linesw: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  suivant: {
    textTransform: 'uppercase',
    fontSize: 40,
    color: '#5FCDFA',
    fontFamily: 'TallFilms',
  },
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  input: {
    height: 45,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    width: '100%',
    paddingBottom: '5%',
  },
  fond: {
    width: '100%',
    height: '120%',
    position: 'absolute',
  },
});
