import React, {useContext, useState, useRef} from 'react'
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
    ActivityIndicator,
    Alert,
    Modal, Pressable, Animated
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import LogoMin from '../../assets/logoMin'
import Fleche from "../../assets/fleche";
import NavApp from "../navigation/NavApp";
import {listeDefis} from "../../functions/defis";
import {Context} from '../utils/Store';
import {ModalHelp} from "./ModalHelp";
import {getUser} from "../../functions/user";

/*
*     */
const Item1 = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.defi}>
       <Text style={[styles.titreBlanc, { fontSize:30, textAlign:"center"}]}>{item.name}</Text>
      {item.description !== undefined ? <Text style={[styles.description,{textAlign:"center"}]}>{item.description}</Text> : <></> }
   </TouchableOpacity>
);
const Item2 = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={styles.defi2}>
        <Text style={[styles.titreBlanc, { fontSize:30,textAlign:"center"}]}>{item.name}</Text>
        {item.description !== undefined ? <Text style={[styles.description,{textAlign:"center"}]}>{item.description}</Text> : <></> }
    </TouchableOpacity>
);

export default function  ListeDefis(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useContext(Context);
    const [ListeDefs, setListeDefs]= useState([])
    const [defisSelect,setDefiSelect] = useState([])
    const opacity = useRef(new Animated.Value(0)).current;
    const getList = async () => {
        setIsLoading(true)
        let list = await listeDefis(state.token,state.user.goals[0].id);
        console.log(list)
        if (list.message) {
             Alert.alert('Erreur serveur', list.message);
             setListeDefs([{
                 "objectifs": [
                     "1","2","3","4"
                 ],
                 "_id": "602a81dd8e7a4103f8366c59",
                 "nomDefi": "Faire 50 mètres",
                 "points": 200,
                 "butNumber": 50,
                 "butUnit": "m",
                 "buts": [
                     {
                         "_id": "60acc575a9ed427566d526af",
                         "unit": "m",
                         "number": 50,
                         "type": "distance"
                     }
                 ],
             }])
        } else {
            await setListeDefs(list)//list.filter(defi => defi.long == undefined ).sort((defi1,defi2) => defi1.butNumber - defi2.butNumber))//setState({user, token: state.token});
        }
        setIsLoading(false)
    };
    const showWarn = () => {
        opacity.setValue(1)
        setTimeout(() =>{fadeOut()},3000)
    }
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(opacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver:true
        }).start();
    };
    React.useEffect(() =>{
        getList();
    },[])
    const render_item = ({ item }) =>{
        if (defisSelect.includes(item)){
            return (
                <Item2
                    key={item.id}
                    item={item}
                    onPress={() => {
                        setDefiSelect(defisSelect.filter( defi => defi !== item))
                    }}
                    style={{ backgroundColor:"#56ADCE"}}
                />
            )
        }
        return (
            <Item1
                key={item._id}
                item={item}
                onPress={() => {
                    setDefiSelect([...defisSelect,item])
                    //if (item.butUnit == "%"){ showWarn()}
                }}
                style={{ }}
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
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#5FCDFA" style={{top: '10%'}} />
                    ) : (

                    <View>
                        <FlatList
                            data={ListeDefs}
                            renderItem={render_item}
                            keyExtractor={item => item.id}
                            extraData={defisSelect}/>
                    </View>
                        )}
                    <Fleche style={{transform:[{rotate:'270deg'}]}}/>
                    <Animated.View style={{backgroundColor:'#5FCDFAFA', opacity:opacity, position: "absolute", borderRadius:5,padding:10}}>
                        <Text style={{color:"white"}}>Attention, si vous choisissez d'intégrer un défi de col,
                            vous ne pourrez plus modifier la puissance demandée pendant la durée du défi.</Text>
                    </Animated.View>
                </View>
                <View style={styles.footer}>
                    {defisSelect.length > 0 ? <TouchableOpacity style={{marginBottom:'10%'}} onPress={()=> {
                        props.navigation.navigate("Compteur",{defis:defisSelect})
                    }} color={'white'}>
                        <Text style={styles.titreBleu}>appuyez pour continuer</Text>
                    </TouchableOpacity> : <></>}

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
            flexDirection: 'column',
            alignContent: 'center',
            zIndex: 100,
            width: '100%',
            marginBottom:'5%',
            borderBottomColor:"#56ADCE",
            borderBottomWidth:3
        },
    defi2: {
        flex: 1,
        alignContent: 'center',
        zIndex: 100,
        width: '100%',
        marginBottom:'5%',
        backgroundColor:"#56ADCE",
        borderBottomColor:"#56ADCE",
        borderBottomWidth:3
    },
     titreBlanc : {
            color: "white",
            textTransform: 'uppercase',
            fontSize: 25,
         fontFamily: 'GnuolaneRG-Regular'
        },
    description : {
        color: "white",
        fontSize: 18,

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
