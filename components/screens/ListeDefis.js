import React, {useContext, useState} from 'react'
import {FlatList, Text, View, StyleSheet, Button, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import LogoMin from '../../assets/logoMin'
import Fleche from "../../assets/fleche";
import NavApp from "../navigation/NavApp";
import listeDefis from "../../functions/defis";
import {Context} from '../utils/Store';
import {getUser} from "../../functions/user";

/*
*     */
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.defi, {style}]}>
       <Text style={[styles.titreBlanc, { fontSize:30}]}>{item.nomDefi}</Text>
   </TouchableOpacity>
);

export default function  ListeDefis(props) {
    const [state, setState] = useContext(Context);
    const [ListeDefs, setListeDefs]= useState([
        {_id:"0",nomDefi:"faire 200km", statut:false},
        {_id:"1",nomDefi:"faire 300km", statut:false},
        {_id:"2",nomDefi:"faire 50km", statut:false},
        {_id:"3",nomDefi:"faire 100km", statut:false},
        {_id:"4",nomDefi:"faire 200km", statut:false},
        {_id:"5",nomDefi:"faire 200km", statut:false},
        {_id:"6",nomDefi:"faire 200km", statut:false},
        {_id:"7",nomDefi:"faire 200km", statut:false},
        ])
    const [defisSelect,setDefiSelect] = useState([])
    const getList = async () => {
        let list = await listeDefis( state.token);
        if (list.message) {
            // Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
        } else {
            await  setListeDefs(list)//setState({user, token: state.token});
        }
    };
    getList()
       // console.log(listeDefis(state.token))
    const render_item = ({ item }) =>{
        return (
            <Item
                key={item._id}
                item={item}
                onPress={() => {
                    item.statut = !item.statut
                    let i = defisSelect
                    item.statut ? i.push(item) : i.splice(i.indexOf(item),1)
                    setDefiSelect(i)
                }}
            />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.fond}
                source={require('../../assets/fond.png')}/>

                <View style={styles.header}>
                    <LogoMin style={{marginBottom:'5%'}}/>
                    <Text  style={[styles.titreBleu, {fontSize:100, fontWeight:'normal', fontFamily:'TallFilms'}]}>Défi</Text>
                    <Text style={[styles.titreBlanc,{fontSize:18,position:'absolute',top:'70%',left:10}]}>Le</Text>
                    <Text style={[styles.titreBlanc, {position:'absolute',top:160}]}>pour cette session</Text>
                </View>
                <View style={styles.body}>
                    <Fleche style={{transform:[{rotate:'90deg'}]}} />
                    <View style={{height:'120%'}}>
                        <FlatList
                            data={ListeDefs}
                            renderItem={render_item}
                            keyExtractor={item => item.id}
                            extraData={defisSelect}/>
                    </View>
                        <Fleche style={{transform:[{rotate:'270deg'}]}}/>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={{marginBottom:'10%'}} onPress={()=> props.navigation.navigate("Jumelage")} color={'white'}>
                        <Text style={styles.titreBleu}>appuyez pour continuer</Text>
                    </TouchableOpacity>
                    <NavApp  navigation={props.navigation}/>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        padding:5,
        marginTop:17
    },
    body:{
        flex:2,
        alignItems: 'center',
        padding:'10%'
    },
    footer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
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
         fontFamily: 'GnuolaneRG-Regular'
        },
    titreBleu : {
        color: "#56ADCE",
        textTransform: 'uppercase',
        fontSize: 25,
        fontFamily: 'GnuolaneRG-Regular'
    },
    fond: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '115%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
})
