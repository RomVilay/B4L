import React, {useState} from "react";
import {Modal, Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import Picker from '@react-native-picker/picker';

const SelectIOS = (props) =>{
    const [tempUnitPoids, setTempUnitPoids] = useState(state.user.unitPoids || 'kg');
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visibleModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Picker
                                selectedValue={tempUnitPoids}
                                style={[styles.input, {width: '100%'}]}
                                itemStyle={[styles.pickerItem,{width:115, left:-5}]}
                                dropdownIconColor={'#5FCDFA'}
                                prompt="pick something"
                                mode={'dropdown'}
                                onValueChange={itemValue => setTempUnitPoids(itemValue)}>
                                {unitsPoids.map(item => {
                                    return <Picker.Item label={item} value={item} key={item} />;
                                })}
                            </Picker>
                        </View>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                props.toggleModal(!props.visibleModal)
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        height: 500,
        width:200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default SelectIOS
