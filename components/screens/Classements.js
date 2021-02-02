import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity, Platform,
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker"

import Navigation from '../../assets/navigation';

import LogoMin from '../../assets/logoMin';
import P1 from '../../assets/Classement/p1';
import NavApp from '../navigation/NavApp';
import Avatar from "./Avatar";
import {Context} from '../utils/Store';

var scnd = require('../../assets/Classement/scnd.png');
var third = require('../../assets/Classement/third.png');

export default function Classements(props) {
  const [state, setState] = useContext(Context);
  const [poduim,setPoduim] = useState([
    'Yann33',
    'Rémi12',
    'Chris'
  ])
  const [categorie,setCategorie] = useState(state.user.genre ? "homme" : "femme")
  const position =  206
  const membres = 212

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.fond} source={require('../../assets/fond.png')} />
        <View style={styles.container}>
          <View style={styles.header}>
            <LogoMin />
            <Text style={[styles.textTitle, {fontSize: 70}]}>Classement</Text>
          </View>
          <View style={[styles.middle, {width: '90%'}]}>
            <View style={styles.selectClass}>
            <DropDownPicker
                items={[{label:"Classement Homme",value:0},
                  {label:"Classement Femme",value:1},
                  {label:"Classement junior",value:2},
                  {label:"Classement senior",value:3}]}
                defaultValue={state.user.genre ? 0 : 1}
                style={[styles.inputContainer,{color: "white", height:50}]}
                itemStyle={{
                  justifyContent: 'center'
                }}
                containerStyle={{height:50}}
                dropDownStyle={{
                  backgroundColor: '#284462',
                  borderTopWidth:0
                }}
                labelStyle={{color:"white"}}
                onChangeItem={ item => setCategorie(item.label)}
                />

            </View>
            <View style={styles.midUser}>
              <View style={styles.avatar}>
                <Avatar avatar={state.user.avatar} />
              </View>
              <View style={[styles.midItem]}>
                <Text style={styles.username}>{state.user.username}</Text>
              </View>
            </View>
            <View style={styles.botUser}>
              <Text style={[styles.number, {fontSize:30}]}>{position}</Text>
              <Text style={styles.linesb}> ème sur </Text>
              <Text style={[styles.number, {fontSize:30}]}>{membres} </Text>
              <Text style={styles.linesb}> utilisateurs</Text>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Statistiques');
                  }}>
                <Text style={styles.linesw}>voir tes stats</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.bottom, {width: '100%'}]}>
            <View
              style={[
                styles.midMid,
                {borderColor: 'white', borderTopWidth: 2},
              ]}>
              <Text style={styles.linesb}> Le podium dans ta catégorie </Text>
            </View>
            <View style={styles.midMid}>
              <View style={styles.midItem}>
                <P1 />
                <View>
                  <Text style={[styles.linesb, {fontSize: 30}]}>
                    N°1
                    <Text style={[styles.linesw, {fontSize: 30}]}>
                     {` ${poduim[0]}`}
                  </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Statistiques');
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.midMid}>
              <View style={styles.midItem}>
                <Image
                  source={scnd}
                  style={{
                    resizeMode: 'contain',
                    height: 60,
                  }}
                />
                <View>
                  <Text style={[styles.linesb, {fontSize: 30}]}>
                    N°2
                    <Text style={[styles.linesw, {fontSize: 30}]}>
                      {` ${poduim[1]}`}
                    </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Statistiques');
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.midItem}>
                <Image
                  source={require('../../assets/Classement/third.png')}
                  style={{
                    resizeMode: 'contain',
                    height: 60,
                  }}
                />
                <View>
                  <Text style={[styles.linesb, {fontSize: 30}]}>
                    N°3
                    <Text style={[styles.linesw, {fontSize: 30}]}>
                      {` ${poduim[2]}`}
                    </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Statistiques');
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <NavApp navigation={props.navigation} />
            </View>
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

    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: '#5FCDFA',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'TallFilms',
  },
  selectClass:{
  ...(Platform.OS !== 'android' && {
      position:"absolute", zIndex:800, top:-20
  }),
      flex:1,
      height:50,
      marginBottom:'5%'
  },
  middle: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottom: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100
  },
  midMid: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  midItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    top: 0,
  },
  midImage: {
    height: 25,
    width: 15,
  },
  username: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 50,
    fontFamily: 'GnuolaneRG-Regular'
  },
  number: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
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
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
    width: 300,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'GnuolaneRG-Regular',
  },
  midUser: {
    flex:2,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent:'space-around'
  },
  avatar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    top: 15,
  },
  botUser:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    marginTop:'2%'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  fond: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '200%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
