import React, {useState} from 'react'
import {FlatList, Text, View, StyleSheet, Button, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'



export default function  Statistiques(props) {
    return (
        <SafeAreaView>
            <ImageBackground
                style={styles.fond}
                source={require('../../assets/fond.png')}
            >
            </ImageBackground>
        </SafeAreaView>
    )

}