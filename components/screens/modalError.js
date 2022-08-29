import React, {useEffect} from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal, Platform
} from "react-native";
import goTo from "../utils/navFunctions";

/**
 * Modal d'affichage des erreur de la carte
 * jaune: peu important
 * rouge: important et arrêt du système
 * @param {*} props 
 * @returns 
 */
export const ModalError = (props) => {
    useEffect(()=>{
        //console.log(props)
    },[props])
    return(
        <View>
        <Modal
            visible={props.modal}
            transparent={true}
            animationType="slide"
        >
            <View style={props.styleModal}>
                {props.styleModal.backgroundColor == styles.dangerModal.backgroundColor ?
                    <>
                        <Text style={[styles.midText,{fontSize:30}]}>{props.erreur[0]}</Text>
                        <Text style={[styles.midText,{fontSize:20, textAlign:"justify", marginLeft:"10%", marginRight:"10%", textTransform:"none"}]}>{props.erreur[1]}</Text>
                        <TouchableOpacity onPress={() => {
                            props.server.destroy()
                            goTo(props.nav)
                        }}>
                            <View style={{backgroundColor: "white", borderRadius: 20, padding: 10, width: "40%"}}>
                                <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "red"}]}>Retour accueil</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    props.styleModal.backgroundColor === styles.endingModal.backgroundColor ?
                        <>
                            <Text style={[styles.midText,{fontSize:25, height:25, top: -15}]}>{props.erreur[0]}</Text>
                            <Text style={[styles.midText,{fontSize:15, top: -10,textAlign:"justify",marginLeft:"5%", marginRight:"5%", textTransform:"none", height:50, }]}>{props.erreur[1]}</Text>
                            <TouchableOpacity onPress={() => {
                                props.setModal(false)
                            }}
                            >
                                <View>
                                    <View style={{borderColor: "white", width: 180, height: 20,borderWidth:2, borderRadius:10, top: -20}}/>
                                    <View style={{ backgroundColor:"white",width: 180*(props.t/15),  top: -20,height: 20,position:"absolute", borderRadius:10 }}/>
                                </View>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <Text style={[styles.midText,{fontSize:30}]}>{props.erreur[0]}</Text>
                            <Text style={[styles.midText,{fontSize:15,height:"54%", textAlign:"justify", marginLeft:"10%", marginRight:"10%", textTransform:"none"}]}>{props.erreur[1]}</Text>
                            <TouchableOpacity onPress={() => {
                                props.setModal(false)
                            }}>
                        <View>
                            <View style={{borderColor: "white", width: 180, height: 20,borderWidth:2, borderRadius:10}}/>
                            <View style={{ backgroundColor:"white",width: 180*(props.t/15), height: 20,position:"absolute", borderRadius:10 }}/>
                            <Text style={[{fontSize: 20, fontFamily: "GnuolaneRG-Regular", color: "#FFB748", marginLeft:"30%", position:"absolute", top:-2}]}>continuer</Text>
                        </View>
                        </TouchableOpacity>
                        </>
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
        height:100,
        width:"75%",
        backgroundColor:"#FFED50AA",
        justifyContent:"center",
        alignItems:"center"
    },
    endingModal:{
        marginLeft:"10%",
        height:100,
        width:"75%",
        backgroundColor:"#5FCDFAAA",
        justifyContent:"center",
        alignItems:"center",
        borderWidth: 3,
        borderColor : "white"
    },
    midText: {
        color: 'white',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'GnuolaneRG-Regular',
    },
})
