import React, {useEffect} from "react";
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
    const [styleM,setStyleM] = React.useState(styles.dangerModal)
    console.log(styleM)
    useEffect(() => { setStyleM(props.styleModal)
            console.log(styleM)
        }, [props.styleModal])
    return(
        <View>
        <Modal
            visible={props.modal}
            transparent={true}
            animationType="slide"
        >
            <View style={props.styleModal}>
                <Text style={[styles.midText,{fontSize:50}]}>Erreur</Text>
                <Text style={[styles.midText,{fontSize:20,height:150, textAlign:"justify", marginLeft:"10%", marginRight:"10%", textTransform:"none"}]}>{props.erreur}</Text>
                {styleM == styles.dangerModal ?
                    <TouchableOpacity onPress={() => {
                        goTo(props)
                    }}>
                        <View style={{backgroundColor: "white", borderRadius: 20, padding: 10, width: "40%"}}>
                            <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "red"}]}>Retour accueil</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View>
                        <View style={{borderColor: "white", width: 180, height: 20,borderWidth:2}}/>
                        <View style={{ backgroundColor:"white",width: 180*(props.t/30), height: 20,position:"absolute" }}/>
                        <TouchableOpacity onPress={() => {
                            props.setModal(false)
                        }}>
                            <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "#FFB748", marginLeft:"30%", position:"absolute",top:-22}]}>continuer</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    dangerModal:{
        alignItems:"center",
        backgroundColor:"#FF0000AA",
        flex:1,
        justifyContent:"center",
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