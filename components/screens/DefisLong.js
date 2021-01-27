import React, {useContext} from "react";
import { View, Modal, Text,TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {Context} from '../utils/Store';
import listeDefis from "../../functions/defis";

const DefisLong = (props) => {
    const [state, setState] = useContext(Context);
    const Item1 = ({ item, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.defi}>
            <Text style={[styles.titreBlanc, { fontSize:30}]}>{item.nomDefi}</Text>
        </TouchableOpacity>
    );
    const Item2 = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={styles.defi2}>
            <Text style={[styles.titreBlanc, { fontSize:30}]}>{item.nomDefi}</Text>
        </TouchableOpacity>
    );
    const getList = async () => {
        let list = await listeDefis(state.token,state.user.objectifs);
        if (list.message) {
            // Alert.alert('Erreur serveur', 'Veuillez rééssayer plus tard');
        } else {
            await setListeDefs(list.filter(defi => defi.long !== undefined ))//setState({user, token: state.token});
        }
    };
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
                        setDefiSelect([...defisSelect,item])
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
                style={{ }}
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
                <View style={{top:"45%", width:"80%", left:"25%"}}>
                    <Text>Choisissez un Défis pour le mois suivant:</Text>
                    <FlatList
                        keyExtractor={item => item._id}
                        data={listeDefs}
                        renderItem={render_item} />
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>Ouvrir</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        position:'absolute',
        zIndex:600,
        width:"80%",
        height:"50%",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
export default DefisLong
