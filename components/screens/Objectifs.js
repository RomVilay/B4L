import React, {useState, useContext} from 'react';
import {View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';

import goTo from '../utils/navFunctions';
import {editUser} from '../../functions/user';
import {Context} from '../utils/Store';

import LogoMin from '../../assets/logoMin';

export default function Objectifs(props) {
  const [state, setState] = useContext(Context);
  const [defis] = useState([
    {id: '0', nom: "Faire du sport"},
    {id: '1', nom: 'Brûler des Calories'},
    {id: '2', nom: "Faire des économies en produisant de l'énergie"},
    {id: '3', nom: "Réduire mon impact sur l'environnement"}
  ]);
  const [status, setStatus] = useState([
    state.user.objectifs.includes('0') || false,
    state.user.objectifs.includes('1') || false,
    state.user.objectifs.includes('2') || false,
    state.user.objectifs.includes('3') || false,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendSelection = async () => {
    let select = [];
    status.map((defi, index) => {
      defi == true ? select.push(defis[index].id) : null;
    });
    if (select.length == 0) {
      return Alert.alert('Erreur', 'Veuillez préciser au moins un objectif');
    }
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      const updated = await editUser(state.user.username, {objectifs: select}, state.token);
      setIsLoading(false);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
      } else {
        setState({user: updated, token: state.token});
        if (
          props.route.params &&
          props.route.params.previousRoute &&
          props.route.params.previousRoute == 'Parametres'
        ) {
          props.navigation.goBack();
        }
        if (
          state.user.poids == undefined ||state.user.taille == undefined
        ) {
          props.navigation.navigate('Parametres');
        }else {
          goTo(props)};
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.fond} source={require('../../assets/fond.png')} />
      <View style={[styles.container, {height: '100%', width: '100%'}]}>
        <View style={[styles.header, {width: '100%'}]}>
          <LogoMin />
          <Text style={[styles.textTitle, {fontSize: 100}]}>Objectif</Text>
          <Text style={[styles.whiteTitle]}>L'</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.linesw}> J'ai envie de :</Text>
          <View style={styles.midItem}>
            {defis.map(defi => {
              return (
                  <View style={styles.listItem}  key={defi.id}>
                    <CheckBox
                        onValueChange={() =>
                            setStatus(previousState => {
                              const newArray = [...previousState];
                              newArray[defi.id] = !status[defi.id];
                              return newArray;
                            })
                        }
                        value={status[defi.id]}
                        boxType={'square'}
                        onFillColor={"white"}
                        onCheckColor={"#1D4465"}
                        onTintColor={"white"}
                        tintColor={"grey"}
                        tintColors={{true:"white"}}
                    />
                    <TouchableOpacity
                        onPress={() => {
                          setStatus(previousState => {
                            const newArray = [...previousState];
                            newArray[defi.id] = !status[defi.id];
                            return newArray;
                          });
                        }}>
                      <Text style={[styles.whiteText,{marginLeft:'5%'}]}>{defi.nom}</Text>
                    </TouchableOpacity>
                  </View>
              );
            })}
          </View>
        </View>
        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#5FCDFA" />
          ) : (
            <Text style={styles.textTitle} onPress={() => sendSelection()}>
              Valider
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  textTitle: {
    color: '#5FCDFA',
    textTransform: 'uppercase',
    fontSize: 80,
    fontFamily: 'TallFilms',
  },
  whiteTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 18,
    fontFamily: 'GnuolaneRG-Regular',
    position: 'absolute',
    top: '55%',
    right: '66%',
  },
  linesb: {
    color: '#5FCDFA',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
  linesw: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
  middle: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
    width: '80%',
  },
  midItem: {
    flex: 2,
    marginTop: 15,
    zIndex: 100,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    width: '93%',
    marginBottom: '5%',
  },
  whiteText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
    marginLeft: '2%',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  selected: {backgroundColor: '#FA7B5F'},
  fond: {
    width: '100%',
    height: '150%',
    position: 'absolute',
  },
});
