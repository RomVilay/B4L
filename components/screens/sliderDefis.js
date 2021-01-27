import React from "react";
import {SafeAreaView, View, FlatList, Text, StyleSheet} from "react-native";

const SliderDefis = (props) => {
    const[currentDefis,setCurent] = React.useState(props.defis[0])
    const[valid,setValid] = React.useState([])
    const renderItem = ({item}) =>{
       if (item === currentDefis){
           return(
               <View style={styles.defisCardBlue}>
                   <Text style={styles.text}>{item.nomDefi}</Text>
               </View>
           )
       }
       if (valid.includes(item)){
           return(
               <View style={styles.defisCardGreen}>
                   <Text style={styles.text}>{item.nomDefi}</Text>
               </View>
           )
       }
       else{
           return(
               <View style={styles.defisCardYellow}>
                   <Text style={styles.text}>{item.nomDefi}</Text>
               </View>
           )
       }
    }
    return(
        <>
        <FlatList
            data={props.defis}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={item => item._id}
            />
        </>
    )
}
const styles = StyleSheet.create({
    defisCardBlue:{
        backgroundColor: "#5FCDFA22",
        borderWidth:1,
        borderColor:"#5FCDFA",
        borderRadius:10,
        padding:"3%"
    },
    defisCardGreen:{
        backgroundColor: "#229418",
        borderRadius:10,
        padding:"3%"
    },
    defisCardYellow:{
        backgroundColor: "#edc600",
        borderRadius:10,
        padding:"3%"
    },
    textBlue:{
        color: '#5FCDFA',
        fontSize: 30,
        fontFamily: 'TallFilms'
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'GnuolaneRG-Regular',
    },
})
export default SliderDefis

