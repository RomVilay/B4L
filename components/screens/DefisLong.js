import React, {useContext} from "react";
import {View, Modal, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Context} from '../utils/Store';
import {listeDefisLongs} from "../../functions/defis";
import {editUser} from "../../functions/user";
import NetInfo from "@react-native-community/netinfo";
import goTo from "../utils/navFunctions";

const DefisLong = (props) => {
    const [state, setState] = useContext(Context);
    const Item1 = ({ item, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.defi}>
            <Text style={[{ fontSize:20,  color: "white", textAlign: 'center', fontFamily: 'GnuolaneRG-Regular'}]}>{item.nomDefi}</Text>
        </TouchableOpacity>
    );
    const Item2 = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={styles.defi2}>
            <Text style={{color: "white", fontSize:20, fontFamily: 'GnuolaneRG-Regular'}}>{item.nomDefi}</Text>
        </TouchableOpacity>
    );
    const getList = async () => {
        let list = await listeDefisLongs(state.token,state.user.objectifs);
        if (list.message) {
            // Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
        } else {
            await
                setListeDefs(list.filter(defi => defi.long !== undefined ))//setState({user, token: state.token});
        }
    };
    const updateUser = async () => {
        setIsLoading(true);
        let isConnected = await NetInfo.fetch().then(state => {
            return state.isConnected;
        });
        if (!isConnected) {
            Alert.alert('Erreur', 'Vérifiez votre connexion Internet et réessayez');
        } else {
            const updated = await editUser(
                state.user.username,
                {
                  defisLongs:defisSelect.map((item) => item._id)
                },
                state.token,
            );
            setIsLoading(false);
            // console.log('updated : ', updated);
            if (updated.message) {
                Alert.alert('Erreur', `${updated.message}`);
            } else {
                setState({user: updated, token: state.token});
                goTo(props);
            }
        }
    };
    const setDefisLong = (defis) =>{
        //setState([...state,defis])
        const copy = state
        copy.user.defisLongs = defis

        setState(copy)
        console.log(state.user.defisLongs)
    }
    const [listeDefs,setListeDefs] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(props.visible);
    const [defisSelect, setDefiSelect] = React.useState([])
    const render_item = ({ item }) =>{
        if (defisSelect.includes(item)){
            return (
                <Item2
                    key={item._id}
                    item={item}
                    onPress={() => {
                        const tab = defisSelect.splice(defisSelect.indexOf(item)-1,1)
                        setDefiSelect(tab)
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
                }}
                style={{ backgroundColor:'transparent'}}
            />
        );
    }
    React.useEffect(() =>{
        getList();
    },[])
    return(
        <View style={styles.view}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={{width:"100%",height:"100%",backgroundColor:"#000000AA"}}>
                    <View style={styles.modalView}>
                        <Text style={{color:"white", fontSize:25, textAlign:"center",fontFamily: 'GnuolaneRG-Regular', marginBottom:10}}>Choisissez un ou plusieurs Défis pour le mois suivant:</Text>
                        <FlatList
                            keyExtractor={item => item._id}
                            data={listeDefs}
                            extraData={defisSelect}
                            renderItem={render_item} />
                        <TouchableOpacity  style={{backgroundColor:"#5FCDFA", padding:'2%', borderRadius:10, color:"white", marginBottom:'5%', }}
                                           onPress={() => {
                                               setDefisLong(defisSelect)
                                               setModalVisible(!modalVisible)}}>
                            <Text style={{color:"white",fontFamily: 'GnuolaneRG-Regular'}}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        position:'absolute',
        zIndex:600
    },
    modalView: {
        top:"45%",
        width:"80%",
        left:"10%",
        borderColor: '#5FCDFA',
        borderWidth:1,
        backgroundColor: '#284462AA',
        borderRadius: 20,
        alignItems: "center",
    },
    defi: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        zIndex: 100,
        width: '100%',
        marginBottom:'5%',
        borderBottomColor:"#56ADCE",
        color: "white",
        borderBottomWidth:3,
        justifyContent:"center",
    },
    defi2: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        zIndex: 100,
        width: '100%',
        marginBottom:'5%',
        backgroundColor:"#56ADCE",
        justifyContent:"center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'GnuolaneRG-Regular'
    }
});
export default DefisLong
