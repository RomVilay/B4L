import React from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal
} from "react-native";
import goTo from "../utils/navFunctions";
export const ModalError = (props) => {
    React.useEffect(()=>{
        console.log(props.stylemodal)
    },[props])
    return(
        <Modal
            visible={props.modal}
            transparent={true}
            animationType="slide"
        ><View
            style={styles.dangerModal}
        >
            <Text style={[styles.midText,{fontSize:50}]}>Erreur</Text>
            <Text style={[styles.midText,{fontSize:20,
                height:150, textAlign:"justify",
                marginLeft:"10%", marginRight:"10%", textTransform:"none"}]}>{props.erreur}</Text>
            {props.styleModal == styles.dangerModal ?
                <TouchableOpacity onPress={() => {
                    goTo(props)
                }}>
                    <View style={{backgroundColor: "white", borderRadius: 20, padding: 10, width: "40%"}}>
                        <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "red"}]}>Retour accueil</Text>
                    </View>
                </TouchableOpacity>
                :
                <View>
                    <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "#FFED50"}]}>Réduire la vitesse</Text>
                    <TouchableOpacity onPress={() => {
                        props.setModal(false)
                    }}>
                        <View style={{backgroundColor: "white", borderRadius: 20}}>
                            <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "#FFED50"}]}>continuer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    dangerModal:{
        backgroundColor:"#FF0000AA",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    warningModal:{
        marginTop:"50%",
        marginLeft:"10%",
        paddingTop:"5%",
        height:400,
        width:"75%",
        backgroundColor:"#FFED50AA",
        justifyContent:"center",
        alignItems:"center"
    },
    midText: {
        color: 'white',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'GnuolaneRG-Regular',
    },
})
