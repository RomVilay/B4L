import React from 'react'
import {View, Image, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native'


import LogoMin from '../../assets/logoMin'

import CheckBox from '@react-native-community/checkbox'

//élément de liste
const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <CheckBox
          style={{marginLeft:'5%'}}
          disabled={false}
          value={item.statut}
          onPress={onPress}
          boxType={'square'}
      />
       <Text style={styles.whiteText}>{item.nom}</Text>
   </TouchableOpacity>
);

export default class Objectifs extends React.Component {
        state={
            defis:[{id:'0',nom:'m\'amuser / me dépenser',statut: false},
                   {id:'1',nom:'perdre du poids',statut:false},
                   {id:'2',nom:'faire des économies en produisant de l\'énergie',statut:false},
                   {id:'3',nom:'Réduire mon impact sur l\'environnement',statut:false}],
            selection:[]
        }

        /* modification du statut du défis en cours d'intégration*/
        render_item = ({item})  => {
            return(
                    <Item
                        item={item}
                        onPress={() => {
                            item.statut = !item.statut
                            let s = this.state.selection
                            item.statut == true ? s.push(item) : s.splice(this.state.selection.indexOf(item),1)
                            this.setState({selection:s})
                        }}
                    />);
                    };
        /* fin de la partie en cours d'intégration */
    render() {
        return (
             <SafeAreaView style={styles.container}>
                <Image
                    style={styles.fond}
                    source={require('../../assets/fond.png')}
                />
                <View style={[styles.container, { height: '100%', width: '100%' }]}>
                   <View style={[styles.header, { width: '100%' }]}>
                        <LogoMin></LogoMin>
                        <Text  style={[styles.textTitle, {fontSize:100}]}>Défi</Text>
                        <Text style={[styles.whiteTitle,{fontSize:18,position:'absolute',top:'53%', left:'41.5%'}]}>Le</Text>
                    </View>
                    <View style={styles.middle}>
                            <Text style={styles.linesw}> Choisis tes objectifs</Text>
                        <View style={styles.midItem}>
                           <FlatList
                              data={this.state.defis}
                              renderItem={this.render_item}
                              keyExtractor={item => item.id}
                           />
                        </View>
                    </View>
                    <View style={styles.footer}>
                    <Text style={styles.textTitle} onPress={() => this.props.navigation.navigate("Connexion")}>Valider</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
     },
     textTitle: {
         color: "#5FCDFA",
         textTransform: 'uppercase',
         fontSize: 80,
         fontFamily:'TallFilms'
     },
     whiteTitle : {
                 color: "white",
                 textTransform: 'uppercase',
                 fontSize: 18,
         fontFamily:'GnuolaneRG-Regular'
             },
     linesb : {
            color: "#5FCDFA",
            fontSize: 25,
         fontFamily:'GnuolaneRG-Regular'
        },
     linesw : {
           color: "white",
           fontSize: 25,
         fontFamily:'GnuolaneRG-Regular'
          },
     middle: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        width:'80%'
        },
     midItem: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'stretch',
        zIndex: 100
         },
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
         fontFamily:'GnuolaneRG-Regular'
        },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    selected: {backgroundColor: "#FA7B5F"},

    fond: {
        width: '100%',
        height: '150%',
        position: 'absolute'
    }
})
