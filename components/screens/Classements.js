import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity, Platform, Alert, ActivityIndicator,
    ScrollView
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker"

import Navigation from '../../assets/navigation';

import LogoMin from '../../assets/logoMin';
import P1 from '../../assets/Classement/p1';
import NavApp from '../navigation/NavApp';
import Avatar from "./Avatar";
import {Context} from '../utils/Store';
import {getClassement} from '../../functions/user';
import moment from "moment";
import goTo from "../utils/navFunctions";

var scnd = require('../../assets/Classement/scnd.png');
var third = require('../../assets/Classement/third.png');

export default function Classements(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(Context);
  const [poduim,setPoduim] = useState([
    'Yann33',
    'Rémi12',
    'Chris'
  ])
  const [categorie,setCategorie] = useState("general")
  const [position,setPosition] =  useState(206)
  const [membres,setMembres] = useState(212)
  const labls = state.user.genre ?
      [{key:"0",label:"Classement Général",value:"general"},
        {key:"1",label:"Classement Homme",value:"homme"},
        {key:"2",label:"Classement junior homme",value:"homme/junior"},
        {key:"3",label:"Classement senior homme",value:"homme/senior"},
        {key:"4",label:"Classement espoir homme",value:"homme/espoir"},
        {key:"5",label:"classement master1 homme",value:"homme/master1"},
        {key:"6",label:"classement master2 homme",value:"homme/master2"},
        {key:"7",label:"classement master3 homme",value:"homme/master3"},
        {key:"8",label:"Classement Femme",value:"femme"},
        {key:"9",label:"Classement junior femme",value:"femme/junior"},
        {key:"10",label:"Classement senior femme",value:"femme/senior"},
        {key:"11",label:"Classement espoir femme",value:"femme/espoir"},
        {key:"12",label:"classement master1 femme",value:"femme/master1"},
        {key:"13",label:"classement master2 femme",value:"femme/master2"},
        {key:"14",label:"classement master3 femme",value:"femme/master3"},
      ] : [{label:"Classement Général",value:"general"},
        {label:"Classement Femme",value:"femme"},
        {label:"Classement junior femme",value:"femme/junior"},
        {label:"Classement senior femme",value:"femme/senior"},
        {label:"Classement espoir femme",value:"femme/espoir"},
        {label:"classement master1 femme",value:"femme/master1"},
        {label:"classement master2 femme",value:"femme/master2"},
        {label:"classement master3 femme",value:"femme/master3"},
        {label:"Classement Homme",value:"homme"},
        {label:"Classement junior homme",value:"homme/junior"},
        {label:"Classement senior homme",value:"homme/senior"},
        {label:"Classement espoir homme",value:"homme/espoir"},
        {label:"classement master1 homme",value:"homme/master1"},
        {label:"classement master2 homme",value:"homme/master2"},
        {label:"classement master3 homme",value:"homme/master3"},
      ]
  const[open, setOpen] = useState(false);
  const[selected, setSelected] = useState("general");
  async function classement (classement){
    const listUsers = await getClassement(state.user.username,state.token,classement)
    if (listUsers.message) {
      Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
      console.log(listUsers.message)
    } else {
      //console.log(listUsers)
      setPosition(listUsers.position)
      setPoduim(listUsers.classement)
      setMembres(listUsers.classement.length)
      //console.log(listUsers.sort(compare).map(user=>user.username))
    }
  }
  function formatDistance (distance){
    if(state.user.unitDistance === "m" ){
      if (distance < 1000){
        return `${distance} m `
      } else {
        return `${distance*Math.pow(10,-3)} km`
      }
    }
    if ( state.user.unitDistance === "ft") {
      return `${Math.round(distance/0.302)} ft`
    }
    if ( state.user.unitDistance === "yd") {
      return `${Math.round(distance/0.9144)} yd`
    }
    if ( state.user.unitDistance === "mi") {
      return `${Math.round(distance/1609.3472)} mi`
    }
  }
  function formatEnergie (energie,unit) {
    let resp = ""
    if (unit === "wh"){
      energie < 1000 ? resp = `${energie} ${unit}` : resp = `${energie*Math.pow(10,-3)} kwh`
    }
    if (unit === "cals"){
      energie/860.8321 < 1000 ? resp = [Math.round(energie/860.8321),"CALS"] : resp = [Math.round(energie/860.8321)*Math.pow(10,-3),"KCALS"]
    }
    if (unit === "co2"){
      energie*Math.pow(10,-3)/72 < 1000 ? resp = [ Number.parseFloat(energie*Math.pow(10,-3)/72).toFixed(2),"gCO2"] : resp = [Math.round(energie*Math.pow(10,-3)/72*Math.pow(10,-3)),"kgCO2"]
    }
    return resp
  }

  const AlertStats = (user) =>
      Alert.alert(
          `Statistiques de ${user.username}`,
          `distances totales parcourues ${user.totalDistance !== null && !isNaN(user.totalDistance) ? formatDistance(user.totalDistance) : 0} 
          \n énergie produite ${user.totalEnergie !== null && !isNaN(user.totalEnergie) ? formatEnergie(user.totalEnergie,"wh") : 0} 
          \n temps passé sur l'application ${user.totalDuree !== null && !isNaN(user.totalDuree)? moment(user.totalDuree).format("HH:mm:ss"):0} 
          \n nombre de points gagnés ${user.totalPoints !== null && !isNaN(user.totalPoints) ? user.totalPoints : 0}`,
          [
            {
              text: 'fermer',
              style: 'cancel',
            }
          ],
          {cancelable: false},
      );
  React.useEffect(()=>{
  //  getClassement()
    classement(categorie == "general" ? "":categorie)
  },[categorie])

  function renderTable(item,index) {
    return <View style={[{flexDirection:"row", justifyContent:"space-between", borderBottomColor:'#5FCDFA', borderBottomWidth:1, flex:1}]}>
      <Text style={[styles.linesw,{width:50}]}>{index}</Text>
      <Text style={styles.linesw}>{item.username}</Text>
      <Text style={[styles.linesw,{width:100, textAlign:"right", fontSize:20}]}>{item.totalPoints !== null && !isNaN(item.totalPoints) ? item.totalPoints : 0} pts</Text>
    </View>
  }
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.fond} source={require('../../assets/fond.png')} />
        <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.header}>
            <LogoMin />
            <Text style={[styles.textTitle, {fontSize: 70}]}>Classement</Text>
          </View>
          <View style={[styles.middle, {width: '90%'}]}>
            <View style={styles.selectClass}>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                setValue={setCategorie}
                items={labls}
                value={categorie}
                style={[styles.inputContainer,{color: "white", height:50}]}
                itemStyle={{
                  justifyContent: 'center',
                }}
                containerStyle={{height:50}}
                dropDownContainerStyle={{
                  backgroundColor: '#284462',
                  borderTopWidth:0,
                  width:"80.5%",
                  borderColor:"#5FCDFA"
                }}
                textStyle={{color:"white",textAlign: 'justify', marginLeft:"15%"}}
                listMode="SCROLLVIEW"
                />

            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
            ) : (
            <View style={styles.midUser}>
              <View style={styles.avatar}>
                <Avatar avatar={state.user.avatar} />
              </View>
              <View style={[styles.midItem]}>
                <Text style={styles.username}>{state.user.username}</Text>
              </View>
            </View>
            )}
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
              {poduim.length>0 ? <Text style={styles.linesb}> Le podium dans ta catégorie </Text> : <></> }
            </View>
            { poduim[0]!== undefined ?
            <View style={styles.midMid}>
              <View style={styles.midItem}>
                <P1 />
                <View>
                  <Text style={[styles.linesb, {fontSize: 30}]}>
                    N°1
                    <Text style={[styles.linesw, {fontSize: 30}]}>
                     {` ${poduim[0].username}`}
                  </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                     AlertStats(poduim[0])
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> : <></> }
            <View style={styles.midMid}>
              { poduim[1]!== undefined ?
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
                      {` ${poduim[1].username}`}
                    </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      AlertStats(poduim[1])
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View> : <Text style={[styles.linesb,{alignSelf:"center"}]}>pas de classement disponible</Text> }
              { poduim[2]!== undefined ?
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
                      {poduim[2].username}
                    </Text>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      AlertStats(poduim[2])
                    }}>
                    <Text style={[styles.linesw, {fontSize: 20}]}>
                      voir ses stats
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
                  : <></> }
            </View>
            {poduim.length > 0 ?
            <View style={styles.table}>
              <Text style={[styles.textTitle,{alignSelf:"center", fontSize:40}]}> Classement de la catégorie</Text>
              {
                poduim.map((value, index) => renderTable(value,index+1))
              }
            </View>
                : <></> }
            <View style={styles.footer}>
              <NavApp navigation={props.navigation} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  contentContainerStyle:{
    alignItems:"center"
  },

  header: {
    marginTop:'5%',
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
      zIndex:800,
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
    marginTop:"5%"
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
    marginTop:'5%'
  },
  table:{
    flex:1,
    borderWidth: 2,
    borderRadius: 10,
    width:"80%",
    padding:"5%",
    marginTop:"10%",
    borderColor: '#5FCDFA',
    backgroundColor: '#284462',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "15%",
    paddingBottom:"5%"
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
