import React from 'react'
import { FlatList, Text , View, StyleSheet} from 'react-native'
import CheckBox from '@react-native-community/checkbox'



const Item = ({ item, onPress }) => (
  <View style={styles.listItem}>
      <CheckBox
       disabled={false}
       value={item.statut}
       onPress={onPress}/>
       <Text style={styles.whiteText}>{item.nom}</Text>
   </View>
);

const render_item = ({ item }) => (
    <Item
        item={item}
        onPress={() => onPress(item.statut)}
    />

 );

export default (ListeDefis = props => (
  <FlatList data={props.data} renderItem={render_item}  keyExtractor={item => item.nom} extraData={props.onPress}/>
))

const styles = StyleSheet.create({
     listItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 100,
            width: '93%',
            marginBottom:'5%'
        },
     whiteText : {
            color: "white",
            textTransform: 'uppercase',
            fontSize: 25,
            fontFamily: 'DIN Condensed',
        },
})