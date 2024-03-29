import React, {useState, useContext} from 'react';
import {View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';

import goTo from '../utils/navFunctions';
import {editUser} from '../../functions/user';
import {listeObjectifs} from '../../functions/objectif'
import {Context} from '../utils/Store';

import LogoMin from '../../assets/logoMin';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Objectifs(props) {
  const [state, setState] = useContext(Context);
  /*const [defis] = useState([
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
  ]);*/
  const [goals,setGoals] = useState([])
  const [selection,setSelection] = useState(state.user.goals)
  const [isLoading, setIsLoading] = useState(false);
  const getList = async () => {
    setIsLoading(true)
    let list = await listeObjectifs(state.token)
    list = list.map(item =>{
      var goal = {id:item.id,description:item.description,name:item.name}
      return goal
    })
    await setGoals(list)
    setIsLoading(false)
  }
  React.useEffect( () => {
    getList()
  },[])

  const sendSelection = async () => {
    let storedPassword = await AsyncStorage.getItem('@bikeforlifepassword');
    if (selection.length === 0) {
      return Alert.alert('Erreur', 'Veuillez préciser au moins un objectif');
    }
    setIsLoading(true);
    let isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });
    if (!isConnected) {
      Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
    } else {
      const updated = await editUser(state.user.id, {"goals": selection, "password": storedPassword, "currentPassword": storedPassword}, state.token);
      setIsLoading(false);
      if (updated.message) {
        Alert.alert('Erreur', `${updated.message}`);
      } else {
        setState({user: updated, token: state.token});
        if (
          props.route.params &&
          props.route.params.previousRoute &&
          props.route.params.previousRoute === 'Parametres'
        ) {
          props.navigation.goBack();
        }
        if (
          state.user.poids === undefined ||state.user.taille === undefined
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
        {isLoading ? (
            <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
        ) : (
        <View style={styles.middle}>
          <Text style={styles.linesw}> J'ai envie de :</Text>
          <View style={styles.midItem}>
            {goals.map(goal => {
             // console.log("sélection :"+selection.filter(item => item !== goal.id))
              return (
                  <View style={styles.listItem}  key={goal.id}>
                    <View style={{ "flexDirection":"row"}}>
                      <CheckBox
                          onValueChange={() => {selection.findIndex(item => item.id === goal.id) > -1 ?
                              selection.splice(selection.findIndex(item => item.id === goal.id),1) :  selection.push(goal)
                            //console.log(selection)
                            setSelection(selection)
                            console.log(selection)
                          }
                          }
                          value={selection.findIndex(item => item.id === goal.id) > -1}
                          boxType={'square'}
                          onFillColor={"white"}
                          onCheckColor={"#1D4465"}
                          onTintColor={"white"}
                          tintColor={"grey"}
                          tintColors={{true:"white"}}
                      />
                      <TouchableOpacity
                          onPress={() => {
                            selection.findIndex(item => item.id === goal.id) > -1 ?
                                selection.splice(selection.findIndex(item => item.id === goal.id),1) :  selection.push(goal)
                          }}>
                        <Text style={[styles.whiteText,{marginLeft:'5%'}]}>{goal.name}</Text>
                      </TouchableOpacity>
                    </View>
                  <Text style={styles.textDescri}>{goal.description}</Text>
                  </View>
              );
            })}
          </View>
        </View>
            )}
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
  textDescri:{
    fontFamily: 'GnuolaneRG-Regular', fontSize:17, color: '#5FCDFA',
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
    alignItems: 'flex-start',
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
