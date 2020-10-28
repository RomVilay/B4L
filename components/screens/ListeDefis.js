import React, {useState} from 'react'
import {FlatList, Text, View, StyleSheet, Button, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import LogoMin from '../../assets/logoMin'
import NavApp from "../navigation/NavApp";

/*
*     */
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.defi, {style}]}>
       <Text style={[styles.titreBlanc, { fontSize:70}]}>{item.descriptionDefis}</Text>
      <CheckBox
          disabled={false}
          value={item.statut}
          onPress={onPress}/>
   </TouchableOpacity>
);

export default function  ListeDefis(props) {
    const [ListeDefs, setListeDefs]= useState([
        {id:0,descriptionDefis:"faire 200km", statut:false},
        {id:1,descriptionDefis:"faire 300km", statut:false},
        {id:2,descriptionDefis:"faire 50km", statut:false},
        {id:3,descriptionDefis:"faire 100km", statut:false},
        {id:4,descriptionDefis:"faire 200km", statut:false},
        {id:4,descriptionDefis:"faire 200km", statut:false},
        {id:5,descriptionDefis:"faire 200km", statut:false},
        {id:6,descriptionDefis:"faire 200km", statut:false},
        ])
    const [defisSelect,setDefiSelect] = useState([])
    //const sel = (item) => {setDefiSelect(defisSelect.push(item))}

    const render_item = ({ item }) =>{
        const backgroundColor = item.id === defisSelect ? "green" : "transparent"
        return (
            <Item
                item={item}
                onPress={() => {
                    item.statut = !item.statut
                    let i = defisSelect
                    item.statut ? i.push(item) : i.splice(i.indexOf(item),1)
                    setDefiSelect(i)
                }}
                style={{backgroundColor}}
            />
        );
    }
    return (
        <SafeAreaView>
            <ImageBackground
                style={styles.fond}
                source={require('../../assets/fond.png')}
            >
                <View style={styles.header}>
                    <LogoMin style={{marginBottom:'5%'}}/>
                    <Text style={styles.titreBlanc}>Le <Text style={styles.titreBleu}>défi</Text> pour cette session</Text>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={ListeDefs}
                        renderItem={render_item}
                        keyExtractor={(item) => {item.id}}
                        extraData={defisSelect}/>
                </View>
                <View style={styles.footer}>
                    <Button title={"suivant"} onPress={()=> props.navigation.navigate("Jumelage")} color={'white'}/>
                    <NavApp navigation={props.navigation}/>
                </View>
            </ImageBackground>
        </SafeAreaView>
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
        flex:2,
        alignItems: 'center',
    },
    footer:{
        flex:1
    },
     defi: {
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            zIndex: 100,
            width: '100%',
            marginBottom:'5%',
            borderBottomColor:"#56ADCE",
            borderBottomWidth:3
        },
     titreBlanc : {
            color: "white",
            textTransform: 'uppercase',
            fontSize: 25,
            fontFamily: 'DIN Condensed',
        },
    titreBleu : {
        color: "#56ADCE",
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