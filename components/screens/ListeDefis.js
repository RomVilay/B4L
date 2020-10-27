import React, {useState} from 'react'
import {FlatList, Text, View, StyleSheet, Button, ImageBackground, Image} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import LogoMin from '../../assets/logoMin'


const Item = ({ item, onPress }) => (
  <View style={styles.listItem}>
      <CheckBox
       disabled={false}
       value={item.statut}
       onPress={onPress}/>
       <Text style={styles.whiteText}>{item.descriptionDefis}</Text>
   </View>
);

const render_item = ({ item }) => (
    <Item
        item={item}
        onPress={() => onPress(item.statut)}
    />

 );

export default function  ListeDefis(props) {
    const [listeDefs, setListeDefs]= useState([{descriptionDefis:"faire 50km", statut:false},{descriptionDefis:"faire 200km", statut:false}])
    return (
        <View>
            <ImageBackground
                style={styles.fond}
                source={require('../../assets/fond.png')}
            >
                <View style={styles.header}>
                    <LogoMin />
                    <Text style={styles.titreBlanc}>Le <Text style={styles.titreBleu}>défi</Text> pour cette session</Text>
                </View>
                <View style={styles.body}>
                    <FlatList data={listedefs} renderItem={render_item} />
                </View>
                <View style={styles.footer}>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({

    header:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        padding:5
    },
    body:{

    },
    footer:{

    },
     listItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 100,
            width: '93%',
            marginBottom:'5%'
        },
     titreBlanc : {
            color: "white",
            textTransform: 'uppercase',
            fontSize: 25,
            fontFamily: 'DIN Condensed',
        },
    titreBleu : {
        color: "white",
        textTransform: 'uppercase',
        fontSize: 25,
        fontFamily: 'DIN Condensed',
    },
    fond: {
         width: '100%',
        height:'100%',
        resizeMode: "cover",
        justifyContent: "center"
    }
})