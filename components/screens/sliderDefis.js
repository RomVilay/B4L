import React, {useRef} from "react";
import {SafeAreaView, View, FlatList, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

const SliderDefis = (props) => {
    const flist = useRef()
    const[currentDefis,setCurent] = React.useState(props.defis[props.current])
    const[valid,setValid] = React.useState(props.defisV)
    const renderItem = ({item,index}) =>{
       if (item === props.defis[props.current]){
           return(
               <TouchableWithoutFeedback onPress={()=>{}}>
               <View style={[styles.defisCardBlue,{marginLeft:index === 0 ? 100:0, marginRight:index === props.defis.length-1 ? 200:0}]}>
                   <Text style={styles.text}>{item.name}</Text>
               </View>
               </TouchableWithoutFeedback>
           )
       }
       if (props.defisV.includes(item)){
           return(
               <View style={[styles.defisCardGreen,{marginRight:index === props.defis.length-1 ? 200:0}]}>
                   <Text style={styles.text}>{item.name}</Text>
               </View>
           )
       }
       else{
           return(
               <TouchableWithoutFeedback onPress={()=>{}}>
               <View style={styles.defisCardYellow}>
                   <Text style={styles.text}>{item.name}</Text>
               </View>
               </TouchableWithoutFeedback>
           )
       }
    }
    React.useEffect(() => {
        if (props.current-1 > -1 && props.current < props.defis.length){
            flist.current.scrollToIndex({'index':props.current})
        }
    },[props])
    return(
        <>
        <FlatList
            ref={flist}
            extraData={props.defisV}
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

