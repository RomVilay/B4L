import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Modal,
  ActivityIndicator, Platform,
    Switch
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import {Context} from '../utils/Store';
import {regexDateNaissance, regexTaille, regexPoids} from '../utils/constants';
import goTo from '../utils/navFunctions';
import {editUser} from '../../functions/user';

import Fleche from '../../assets/fleche';
import LogoMin from '../../assets/logoMin';
import NavApp from '../navigation/NavApp';
import Avatar from './Avatar';
import Icon from "react-native-vector-icons/FontAwesome5";
import SelectIOS from "./SelectIos";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 * Définition du profil utilisateur
 * @param {*} props 
 * @returns 
 */

export default function Parametres(props) {
  const [state, setState] = useContext(Context);
  const [parties] = useState(['Visage', 'Coupe', 'Teint', 'Tenue', 'Casque']);
  const [unitsTaille] = useState(['cm', 'ft', 'inch', 'yd']);
  const [unitsPoids] = useState(['kg', 'lb']);
  const [unitsDistance] = useState(['m', 'ft', 'yd', 'mi']);

  const [selection, setSelection] = useState('Visage');
  const [isLoading, setIsLoading] = useState(false);
  const [tempDateNaissance, setTempDateNaissance] = useState(
    state.user.birthdate ? new Date(state.user.birthdate) : '',
  );
  const [tempTaille, setTempTaille] = useState(state.user.height !== null ? state.user.height.toString() : '');
  const [tempPoids, setTempPoids] = useState(state.user.weight !== null ? state.user.weight.toString() : '');
  const [avatar, setAvatar] = useState(state.user.avatar || '03940');
  const [tempUnitTaille, setTempUnitTaille] = useState(state.user.heightUnit || 'cm');
  const [tempUnitPoids, setTempUnitPoids] = useState(state.user.weightUnit || 'kg');
  const [tempUnitDistance, setTempUnitDistance] = useState(state.user.distanceUnit || 'm');
  const [showCalendar, setShowCalendar] = useState(Platform.OS === 'ios');
  const [genre, setGenre] = useState(state.user.gender)

  const checkFields = () => {
    if (!tempTaille.match(regexTaille) || tempTaille.length <= 0) {
      Alert.alert('Erreur', `Veuillez saisir une taille valide`);
    } else if (!tempPoids.match(regexPoids) || tempPoids.length <= 0) {
      Alert.alert('Erreur', `Veuillez saisir un poids valide`);
    } else if (moment().diff(moment(tempDateNaissance),"years") < 6){
      Alert.alert('Erreur','Veuillez entrer une date de naissance valide')
    } else {
      updateUser();
    }
  };

  const picker =  <Picker
      selectedValue={tempUnitPoids}
      style={[styles.input, {width: '100%'}]}
      itemStyle={[styles.pickerItem,{width:115, left:-5}]}
      dropdownIconColor={'#5FCDFA'}
      prompt="pick something"
      mode={'dropdown'}
      onValueChange={itemValue => setTempUnitPoids(itemValue)}>
    {unitsPoids.map(item => {
      return <Picker.Item label={item} value={item} key={item} />;
    })}
  </Picker>

  const updateUser = async () => {
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      let storedPassword = await AsyncStorage.getItem('@bikeforlifepassword');
      console.log(typeof tempTaille)
      const updated = await editUser(
        state.user.id,
        {
          birthdate: tempDateNaissance,
          weight: Number.parseInt(tempPoids),
          height: Number.parseInt(tempTaille),
          avatar: avatar,
          heightUnit: tempUnitTaille,
          weigthUnit: tempUnitPoids,
          distanceUnit: tempUnitDistance,
          gender:genre,
          password: storedPassword,
          currentPassword: storedPassword
        },
        state.token,
      );
      setIsLoading(false);
      // console.log('updated : ', updated);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
      } else {
        updated.challenges = state.user.challenges
        updated.goals = state.user.goals
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
                switch (selection) {
                  case 'Visage':
                    let s = '';
                    avatar.charAt(4) > 0
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          (parseInt(avatar.charAt(4)) - 1))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + avatar.charAt(2) + avatar.charAt(3) + '3');
                    setAvatar(s);
                    break;
                  case 'Coupe':
                    s = '';
                    avatar.charAt(3) > 0
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          (parseInt(avatar.charAt(3)) - 1) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + avatar.charAt(2) + '8' + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Teint':
                    s = '';
                    avatar.charAt(0) > 0
                      ? (s =
                          parseInt(avatar.charAt(0)) -
                          1 +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = '2' + avatar.charAt(1) + avatar.charAt(2) + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Casque':
                    avatar.charAt(2) > 0
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          (parseInt(avatar.charAt(2)) - 1) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + '2' + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Tenue':
                    avatar.charAt(1) > 0
                      ? (s =
                          avatar.charAt(0) +
                          (parseInt(avatar.charAt(1)) - 1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + '7' + avatar.charAt(2) + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    s = '';
                    console.log(avatar + '  ' + state.user.avatar);
                    break;
                  default:
                    break;
                }
              }}>
              <Fleche />
            </TouchableOpacity>
            <Avatar avatar={avatar} />
            <TouchableOpacity
              onPress={() => {
                switch (selection) {
                  case 'Visage':
                    let s = '';
                    avatar.charAt(4) < 3
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          (parseInt(avatar.charAt(4)) + 1))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + avatar.charAt(2) + avatar.charAt(3) + '0');
                    setAvatar(s);
                    break;
                  case 'Coupe':
                    avatar.charAt(3) < 8
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          (parseInt(avatar.charAt(3)) + 1) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + avatar.charAt(2) + '0' + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Teint':
                    s = '';
                    avatar.charAt(0) < 2
                      ? (s =
                          parseInt(avatar.charAt(0)) +
                          1 +
                          avatar.charAt(1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = '0' + avatar.charAt(1) + avatar.charAt(2) + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Casque':
                    avatar.charAt(2) < 7
                      ? (s =
                          avatar.charAt(0) +
                          avatar.charAt(1) +
                          (parseInt(avatar.charAt(2)) + 1) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + avatar.charAt(1) + '0' + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    break;
                  case 'Tenue':
                    avatar.charAt(1) < 7
                      ? (s =
                          avatar.charAt(0) +
                          (parseInt(avatar.charAt(1)) + 1) +
                          avatar.charAt(2) +
                          avatar.charAt(3) +
                          avatar.charAt(4))
                      : (s = avatar.charAt(0) + '0' + avatar.charAt(2) + avatar.charAt(3) + avatar.charAt(4));
                    setAvatar(s);
                    s = '';
                    break;
                  default:
                    break;
                }
              }}>
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
            <Text style={styles.inputTitle}>{'Date de naissance'}</Text>
            <View style={[styles.inputContainer,{ zIndex:600, justifyContent:"center"}]}>
              <TouchableOpacity onPress={() => setShowCalendar(true)} >
                <TextInput
                  value={tempDateNaissance && Platform.OS === 'android'  ? moment(tempDateNaissance).format('DD/MM/YYYY') : ''}
                  style={styles.input}
                  editable={false}
                  placeholder={Platform.OS === 'android' ? "Indiquez votre date de naissance" : ''}
                  placeholderTextColor="#b8b8b8"
                />
              </TouchableOpacity>
            {showCalendar && (
                  Platform.OS === 'ios' ?
                        <DateTimePicker
                            value={tempDateNaissance || new Date()}
                            onChange={(event, selectedDate) => {
                              const currentDate = selectedDate || tempDateNaissance;
                              setTempDateNaissance(currentDate);
                            }}
                            maximumDate={new Date()}
                            display="compact"
                            textColor="white"
                            locale="fr-FR"
                            style={{width: 120,  alignSelf:"center", zIndex:600, position:"absolute", color:"orange"}}
                        />
                  :
                    <DateTimePicker
                        value={tempDateNaissance || new Date()}
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || tempDateNaissance;
                          setShowCalendar(Platform.OS === 'ios');
                          setTempDateNaissance(currentDate);
                        }}
                        maximumDate={new Date()}
                    />
            )}
            </View>
            <View style={[styles.horizontal,{justifyContent:"space-around"}]}>
              <Text style={styles.linesb}>Femme</Text>
              <Switch
                  trackColor={{ false: "#5FCDFA", true: "#5FCDFA" }}
                  thumbColor={genre ? "black" : "#5FCDFA"}
                  onValueChange={() => setGenre(!genre)}
                  ios_backgroundColor="black"
                  value={genre} />
              <Text style={styles.linesb}>homme</Text>
            </View>
            <View style={styles.horizontal}>
              <View
                style={{
                  alignItems: 'center',
                  width: '75%',
                }}>
                <Text style={styles.inputTitle}>{'Taille'}</Text>
                <View style={[styles.inputContainer, {width: '100%'}]}>
                  <TextInput
                    value={tempTaille}
                    style={styles.input}
                    onChangeText={taille => setTempTaille(taille)}
                    placeholder="Indiquez votre taille"
                    placeholderTextColor="#b8b8b8"
                  />
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  width: '75%',
                }}>
                <Text style={styles.inputTitle}>{'Unité de taille'}</Text>
                <View style={[styles.inputContainer, {width: '60%'}]}>
                  {Platform.select({
                    ios: () => <Icon name="chevron-up" color="white"  size={20} style={{position:"absolute",left:'75%', top:'15%'}}/>,
                    android: () => {}
                  })() }
                  <Picker
                    selectedValue={tempUnitTaille}
                    style={[styles.input, {width: '100%'}]}
                    itemStyle={[styles.pickerItem,{width:115, left:-5}]}
                    dropdownIconColor={'#5FCDFA'}
                    mode={'dropdown'}
                    onValueChange={itemValue => setTempUnitTaille(itemValue)}>
                    {unitsTaille.map(item => {
                      return <Picker.Item label={item} value={item} key={item} />;
                    })}
                  </Picker>
                  {Platform.select({
                    ios: () => <Icon name="chevron-down" color="white"  size={20} style={{position:"absolute",left:'75%', bottom:'5%'}}/>,
                    android: () => {}
                  })() }
                </View>
              </View>
            </View>
            <View style={styles.horizontal}>
              <View
                style={{
                  alignItems: 'center',
                  width: '75%',
                }}>
                <Text style={styles.inputTitle}>{'Poids'}</Text>
                <View style={[styles.inputContainer, {width: '100%'}]}>
                  <TextInput
                    value={tempPoids}
                    style={[styles.input, tempPoids == '' ? 12 : 20]}
                    onChangeText={poids => setTempPoids(poids)}
                    placeholder="Indiquez votre poids"
                    placeholderTextColor="#b8b8b8"
                  />
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  width: '75%',
                }}>
                <Text style={styles.inputTitle}>{'Unité de poids'}</Text>
                <View style={[styles.inputContainer, {width: '60%'}]}>
                  {Platform.select({
                    ios: () => <Icon name="chevron-up" color="white"  size={20} style={{position:"absolute",left:'75%', top:'15%'}}/>,
                    android: () => {}
                  })() }
                  {picker}
                  {Platform.select({
                    ios: () => <Icon name="chevron-down" color="white"  size={20} style={{position:"absolute",left:'75%', bottom:'5%'}}/>,
                    android: () => {}
                  })() }
                </View>
              </View>
            </View>
            <Text style={[styles.inputTitle, {marginTop: 20}]}>{'Unité de mesure de distance'}</Text>
            <View
              style={{
                alignItems: 'center',
                width: '75%',
                flexDirection: 'row',
              }}>
              <View style={[styles.inputContainer, {width: '60%', borderWidth:3}]}>
                {Platform.select({
                  ios: () => <Icon name="chevron-up" color="white"  size={20} style={{position:"absolute",left:'75%', top:'15%'}}/>,
                  android: () => {}
                })() }
                <Picker
                  selectedValue={tempUnitDistance}
                  style={styles.selectableInput}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor={'#5FCDFA'}
                  mode={'dropdown'}
                  onValueChange={itemValue => {setTempUnitDistance(itemValue)
                   }}>
                  {unitsDistance.map(item => {
                    return <Picker.Item label={item} value={item} key={item} />;
                  })}
                </Picker>
                {Platform.select({
                  ios: () => <Icon name="chevron-down" color="white"  size={20} style={{position:"absolute",left:'75%', bottom:'5%'}}/>,
                  android: () => {}
                })() }
              </View>
            </View>
            <TouchableHighlight
              style={{marginTop: 10, marginBottom: 15}}
              onPress={() => props.navigation.navigate('Objectifs', {previousRoute: 'Parametres'})}>
              <Text style={styles.btnObjectifs}>Modifier mes objectifs</Text>
            </TouchableHighlight>
          </View>
        </View>
        {/* FIN MID */}

        {/* FOOTER */}
        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
          ) : (
            <TouchableOpacity onPress={() => checkFields()}>
              <Text style={[styles.suivant]}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* FIN FOOTER */}
        <View style={{marginTop:30}}>
          <NavApp style={styles.navApp} navigation={props.navigation} />
        </View>
      </KeyboardAwareScrollView>
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
    marginBottom: '5%',
  },
  midBot: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100
  },
  inlineItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:30
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    width: '70%',
  },
  inputTitle: {
    color: '#5FCDFA',
    fontSize: 30,
    fontFamily: 'TallFilms',
  },
  inputContainer: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: '5%',
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
  selectableInput: {
    height: 45,
    width: 200,
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    ...Platform.select({
      ios:{
        height:50,
        color:"white"
      }})
  },
  pickerItem:{
    ...Platform.select({
      ios:{
        width:200,
        height:50,
        color:"white"
      }
    })
  },
  btnObjectifs: {
    width: '120%',
    fontSize: 30,
    color: '#FFFF',
    fontFamily: 'TallFilms',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    width: '100%',
    marginBottom:40
  },
  fond: {
    width: '100%',
    height: '120%',
    position: 'absolute',
  },
});
