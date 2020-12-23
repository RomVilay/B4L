import React, {useState} from 'react';
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
  Platform
} from 'react-native';
import LogoMin from '../../assets/logoMin';
import NavApp from '../navigation/NavApp';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import slicedToArrayLoose from "@babel/runtime/helpers/esm/slicedToArrayLoose";

export default function Statistiques(props) {
  const [Dates, setDates] = useState([moment('2020-10-10'), moment()]);
  const [displayedDate, setdisplayedDate] = useState(moment());
  const data = {
    labels: ['Objectif'], // optional
    data: [0.5],
    units:"kw",
    units2:"kcals",
    quantits:'2500',
    totalq:'5000'
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    position:"absolute",
    zIndex: 0,
  };
  const chartConfig2 = {
    backgroundGradientFrom: '#5FCDFA',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#5FCDFA',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(95, 206, 250, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
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
            onChange={date =>
              date.startDate != null && date.endDate != null
                ? setDates([moment(date.startDate), moment(date.endDate)])
                : date.startDate != null && date.endDate == null
                ? setDates([moment(date.startDate), Dates[1]])
                : setDates([Dates[0], moment(date.endDate)])
            }
            endDate={Dates[1]}
            startDate={Dates[0]}
            displayedDate={displayedDate}
            range
            containerStyle={styles.containerDate}
            selectedStyle={styles.selected}
            backdropStyle={styles.backdropStyle}
          >
            <Text style={styles.texteBlanc}>
              Du {Dates[0].format('DD/MM')} au {Dates[1].format('DD/MM')}
            </Text>
          </DateRangePicker>
        </View>
        <View style={[styles.body, {zIndex: 0}]}>
          <View style={{alignItems: 'center', zIndex: 0}}>
            <Text style={styles.texteBlanc}>Historique des Distances</Text>
            <LineChart
              data={{
                labels: [
                  'session 1 ',
                  'session 2 ',
                  'session 3 ',
                  'session 4 ',
                  'session 5 ',
                  'session 6',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 10}
              height={120}
              yAxisLabel=""
              yAxisSuffix="km"
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
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{alignItems: 'center', zIndex: 0}}>
            <Text style={styles.texteBlanc}>
              Historique de l'énergie produite
            </Text>
            <LineChart
              data={{
                labels: [
                  'session 1 ',
                  'session 2 ',
                  'session 3 ',
                  'session 4 ',
                  'session 5 ',
                  'session 6',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 10}
              height={120}
              yAxisLabel=""
              yAxisSuffix="kw"
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
                  zIndex: 0,
                },
                propsForDots: {
                  r: '6',
                  zIndex: 0,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                zIndex:0
              }}
            />
          </View>
          <Text style={[styles.texteBlanc, {fontSize: 20}]}>
            Complétion des objectifs de la période{' '}
          </Text>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FFFFFF22',
                borderRadius: 10,
              }}>
              <Text
                style={[
                  styles.texteBlanc,
                  {fontSize: 20, textTransform: 'none', marginLeft: 5},
                ]}>
                production d'énergie{' '}
              </Text>
              <Text style={{position: 'absolute', top: 52, color: 'white'}}>
                {data.data * 100}%
              </Text>
              <ProgressChart
                data={data}
                width={80}
                height={80}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={true}
              />
              <Text style={{ color: 'white'}}>{data.quantits} / {data.totalq} {data.units}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#5fcefa22',
                borderRadius: 10,
                marginLeft: 50,
              }}>
              <Text
                style={[
                  styles.texteBlanc,
                  {
                    fontSize: 20,
                    textTransform: 'none',
                    color: '#5fcefa',
                    marginLeft: 5,
                  },
                ]}>
                calories dépensées{' '}
              </Text>
              <Text style={{position: 'absolute', top: 52, color: '#5fcefa'}}>
                {data.data * 100}%
              </Text>
              <ProgressChart
                data={data}
                width={80}
                height={80}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig2}
                hideLegend={true}
              />
              <Text style={{ color: '#5fcefa'}}>{data.quantits} / {data.totalq} {data.units2}</Text>
            </View>
          </View>
        </View>
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
  body: {
    ...Platform.select({
      ios:{
    marginTop: '45%'}}),
    flex: 4,
    alignItems: 'center',
    zIndex:0,

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
    backgroundColor:'#FFFFFFDD'
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
