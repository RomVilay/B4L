import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
  Platform, Alert,
  ActivityIndicator
} from 'react-native';
import LogoMin from '../../assets/logoMin';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import {Context} from '../utils/Store';
import {listeDefisLongs} from "../../functions/defis";
import {getSessionsByUsername} from "../../functions/session";
/**
 * écran des statistiques de l'application
 * @param {*} props 
 * @returns 
 */
export default function Statistiques(props) {
  const [state,setState] = useContext(Context)
  const [isLoading, setIsLoading] = useState(false);
  const [Dates, setDates] = useState([moment().subtract(1,'months'), moment()]);
  const [defisLongs,setDefisLongs] = useState([])
  const [sessions,setSessions] = useState([])
  const [displayedDate, setdisplayedDate] = useState(moment());
  const [selector,setselector] = useState("km")
  const [labels,setLabels] = useState([
    Dates[0].format("DD-MM").toString(),
    Dates[0].clone().add(15,"days").format("DD-MM").toString(),
    Dates[0].clone().add(30,"days").format("DD-MM").toString(),
    Dates[0].clone().add(45,"days").format("DD-MM").toString(),
    Dates[1].format("DD-MM").toString(),
  ]);
  const [data,setData] = useState( {
    data: [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ],
  })

  const getDefisLongs = async () => {
    setIsLoading(true)
    let defis = await  listeDefisLongs(state.token,state.user.objectifs)
    if (defis.message) {
      Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
    } else {
      await setDefisLongs(defis.filter(defi => state.user.defisLongs.includes(defi._id)))
    }
    setIsLoading(false)
  }
  const getSessions = async (user) => {
    setIsLoading(true)
    let sessions = await getSessionsByUsername(user, state.token)
    if (sessions.message) {
      console.log(sessions.message)
      //Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
    } else {
      await setSessions(sessions)
      sessions[0] !== undefined ? setDates([moment(sessions[0].dateSession),Dates[1]]): console.log("pas de sessions")
      DefLabels(sessions)
    }
    setIsLoading(false)
  }
  const DefLabels = (s) => {
    let tab = []
    let tab2 = []
    if (s.length <= 5 && s.length > 0) {
      setLabels(s.map(session => session.dateSesssion))
      for (let i=0; i < s.length; i++) {
        tab.push(moment(s[i].dateSession).format("DD-MM").toString())
        switch (selector) {
          case "kh/h":
            tab2.push(s[i].vitesse.reduce((moy,val) => moy+val)/(s[i].vitesse.length))
            break;
          case "km":
            tab2.push(s[i].distance / 1000)
            break;
          case "kw":
            tab2.push(s[i].energie / 1000)
            break;
          case "%":
            let calc = s[i].inclinaison.reduce((moy, val) => moy + val / s[i].inclinaison.length)
            tab2.push(isNaN(calc) ? 0 : calc)
            break;
        }
      }
    }
    if (s.length >= 5){
    let j = Math.round(s.length / 5)
    for ( let i=0; tab.length<5; i=i+j){
      tab.push(moment(s[i].dateSession).format("DD-MM").toString())
      switch (selector){
        case "kmh":
          tab2.push(s[i].vitesse.reduce((moy,val) => moy+val)/(s[i].vitesse.length))
              break;
        case "km":
          tab2.push(s[i].distance/1000)
              break;
        case "kw":
          tab2.push(s[i].energie/1000)
              break;
        case "%":
          let calc = s[i].inclinaison.reduce((moy,val) => moy+val/s[i].inclinaison.length)
          tab2.push( isNaN(calc) ? 0 : calc)
              break;
      }
    }
    setLabels(tab)
    setData({data:tab2})
  }
  }
  React.useEffect( () => {
    getSessions(state.user._id)
    DefLabels(sessions)
    getDefisLongs()
  }, [])
  React.useEffect( ()=>{
    let tab2 = sessions.filter( session => moment(session.dateSession).isBefore(Dates[1]) && moment(session.dateSession).isAfter(Dates[0]) )
    tab2.length > 0 ?
        DefLabels(tab2) : console.log(selector)
  }, [selector])
  const alertDate = () =>
      Alert.alert("Sélection des dates",
          "Aucune session n'a été enregistrée sur cette période, veuillez choisir un autre interval.",
          [{text:"ok"}] )
  const render_item = ({ item }) =>{
    const val = item.butUnit == "m" ? state.user.totalDistance : state.user.totalEnergie
    const pourcentage = item.butUnit == "m" ?
        state.user.totalDistance/item.butNumber :
        item.butUnit == "watts" ?
            state.user.totalEnergie/item.butNumber :
            state.user.totalDuree/item.butNumber
    const progress = {data:[pourcentage]}
    const config = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 1, // optional, default 3
      barPercentage: pourcentage,
      useShadowColorFromDataset: false, // optional
      position:"absolute",
      zIndex: 0,
    };
    return(
        <View style={[styles.flatlistItem]}>
          <Text
              style={[
                styles.texteBlanc,
                {fontSize: 20, textTransform: 'none', marginLeft: 5},
              ]}>
            {item.nomDefi}
          </Text>
          <Text style={{position: 'absolute', top: 55, color: 'white', fontSize:12}}>
            {pourcentage .toFixed(2)}%
          </Text>
          <ProgressChart
              data={progress}
              width={80}
              height={80}
              strokeWidth={16}
              radius={32}
              chartConfig={config}
              hideLegend={true}
          />
          <Text style={{ color: 'white'}}>{val} / {item.butNumber} {item.butUnit}</Text>
        </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.fond}
        source={require('../../assets/fond.png')}>
        <View style={styles.header}>
          <LogoMin />
            <Text style={[styles.titreBleu, {height: 50}]}>Statistiques</Text>
          {/**/}
          <DateRangePicker
            onChange={date => {
              if (moment(date.displayedDate) !== moment(displayedDate)){
                setdisplayedDate(moment(date.displayedDate))
              }
                if (date.startDate != null) {
                  setDates([moment(date.startDate), Dates[1]])
                  setdisplayedDate(moment(date.startDate))
                }
                if (date.endDate != null && date.startDate == null){
                  setDates([Dates[0], moment(date.endDate)])
                  setdisplayedDate(moment(date.endDate))
                  if (Dates[1] !== date.endDate) {
                    var diff = Dates[1].diff(Dates[0], "days")
                    let btw = Dates[0].clone()
                    let tab = [Dates[0].format("DD-MMM").toString()]
                    for (let i = 0;i<3;i++){
                      btw.add(diff/4,"days")
                      tab.push(btw.format("DD-MMM").toString())
                    }
                    tab.push(moment(date.endDate).format("DD-MMM"))
                    let tab2 = sessions.filter( session => moment(session.dateSession).isBefore(Dates[1]) && moment(session.dateSession).isAfter(Dates[0]) )
                    tab2.length > 0 ?
                        DefLabels(tab2) : alertDate()
                  }
                }
            }}
            endDate={Dates[1]}
            startDate={Dates[0]}
            displayedDate={displayedDate}
            range
            containerStyle={styles.containerDate}
            selectedStyle={styles.selected}
            backdropStyle={styles.backdropStyle}
          >
            <Text style={styles.texteBlanc}>
              Du {moment(Dates[0]).format('DD/MM')} au {Dates[1].format('DD/MM')}
            </Text>
          </DateRangePicker>
        </View>
        {isLoading ? (
            <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
        ) : (
        <View style={[styles.body, {}]}>
          <View style={styles.picker}>
            <Picker
                selectedValue={selector}
                style={styles.pickerField}
                mode="dropdown"
                onValueChange={(itemValue) => {
                  setselector(itemValue)
                }}
                itemStyle={styles.itemStyle}
                >
              <Picker.Item label="Historique des distances parcourues" value="km" />
              <Picker.Item label="Historique de l'énergie produite" value="kw" />
              <Picker.Item label="Historique des dénivelés franchis" value="%" />
              <Picker.Item label="Historique des vitesses moyennes par sessions" value="kmh" />
            </Picker>
            {Platform.select({
              ios: () => <Icon name="menu-swap" color="white"  size={30} style={{position:"absolute", top: 5, left: 15}} />,
              android: () => {}
            })() }
          </View>

          <View style={styles.tableView}>
            <LineChart
              data={{
                labels: labels,
                datasets: [data],
              }}
              width={Dimensions.get('window').width - 10}
              height={190}
              yAxisLabel=""
              yAxisSuffix={selector}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientFromOpacity: 0.2,
                backgroundGradientTo: '#FFFFFF',
                backgroundGradientToOpacity: 0.2,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  zIndex: 0,
                },
                propsForHorizontalLabels:{
                  x:"55"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          {/*  </Collapsible> */}
          </View>
          <Text style={[styles.texteBlanc, {fontSize: 20}]}>
            Avancement des défis longs sur la période
          </Text>
          <View style={{alignItems: 'center', flexDirection: 'row', flex:1, margin:'5%'}}>
            <FlatList
                horizontal={true}
                extraData={defisLongs}
                data={defisLongs}
                renderItem={render_item}
                keyExtractor={item => item._id}
                />
          </View>
        </View> )}
        <View style={styles.footer}>
          <TouchableHighlight
            onPress={() => props.navigation.navigate('Classements')}>
            <Text style={[styles.titreBleu, {fontSize: 45}]}>
              retour
            </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

function unit()  {
  switch (selector) {
  case 0:
    setUnit(" km")
    break;
  case 1:
    setUnit(" kw")
    break;
  case 2:
    setUnit(" m")
    break;
  }
}
const styles = StyleSheet.create({
  fond: { ...Platform.select({
      ios: {
        position: 'absolute',
        zIndex:0
      },
      android: {
      },
    }),
    flex: 1,
    width: '100%',
    height: '110%',
    resizeMode: 'cover',
    justifyContent: 'center',

  },
  header: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    ...Platform.select({
      ios:{
        position:"absolute",
        top:20,
        left:Dimensions.get("window").width/2-60,
        zIndex:20
      },
      android:{

      }
    })
  },
  titreBleu: {
    color: '#56ADCE',
    textTransform: 'uppercase',
    fontSize: 60,
    fontFamily: 'TallFilms',
  },
  texteBlanc: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 25,
    fontFamily: 'GnuolaneRG-Regular',
  },
  itemStyle:{
    fontSize:20,
    color:"white",
    height:40,
    fontWeight:"bold",
    textTransform:"uppercase",
    fontFamily: 'GnuolaneRG-Regular'
  },
  picker:{
    backgroundColor:"#56ADCEAA",
    borderRadius:12,
    flexDirection: "row",
    marginTop:'2%'
  },
  pickerField:{
    height:40,
    width:Dimensions.get("screen").width-50,
    color:"white",

  },
  body: {
     marginTop:"5%",
    ...Platform.select({
      ios:{
      marginTop: '45%'}}),
    flex: 4,
    alignItems: 'center',
    zIndex:0,
  },
  tableView:{
    alignItems: 'center',
    zIndex: 0
  },
  flatlistItem:{
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#5fcefa22',
    borderRadius: 10,
    marginLeft: 50,
    flex:1,
    width:200
  },
  footer: {
    position:"absolute",
    left: Dimensions.get("screen").width/2-20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios:{bottom:40},
      android:{bottom:0}})
  },
  containerDate:{
    position:"absolute",
    top:-200,
    left:-170,
    zIndex:20,
    backgroundColor:'#FFFFFF'
  },
  selectedtext:{
    color:"white"
  },

  backdropStyle:{
    backgroundColor:'transparent'
  },
  selected:{
    backgroundColor: '#56ADCE'
  },
  container: {
    flex: 1,
    height: '110%',
    flexWrap: 'nowrap',
    zIndex:0
  },
});
