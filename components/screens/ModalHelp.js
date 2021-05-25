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
import {height} from "react-native-daterange-picker/src/modules";
export const  ModalHelp = (props) => {
    useEffect(()=>{
        //console.log(props)
    },[props])
    return(
        <Modal
           visible={props.modal} animation="slide" style={{height:200}} transparent={true}>
            <View style={{height:200, backgroundColor:"white"}}>
                <Text>Modal Help</Text>
            </View>
        </Modal>
    )
}
