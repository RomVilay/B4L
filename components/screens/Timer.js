import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = (props) => {
    var [seconds,setSeconds] = React.useState(0);
    var Interval = useRef();
    React.useEffect(() => {
        if (props.start == true) {
            clearInterval(Interval.current);
            Interval.current = setInterval(startTimer, 1000);
        } 
        if (props.start == false){
            clearInterval(Interval.current);
        }        
    }, [props.start])
    React.useEffect( () => {
         if (props.reset) {
            clearInterval(Interval.current);
            setSeconds(0);
        }
    },[props.reset])
    React.useEffect( ()=> () => 
       clearInterval(Interval.current),[])


    const startTimer = () => {
        setSeconds(seconds++);
    }
    const format = (seconds) =>{
        const getSeconds = `0${(seconds % 60)}`.slice(-2)
        const minutes = `${Math.floor(seconds / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2)
        return `${getHours}:${getMinutes}:${getSeconds}`
    }
    props.getTime = format(seconds)
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>{format(seconds)}</Text>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 220,
        marginLeft: '22%',
    },
    text: {
        fontSize: 50,
        color: 'white',
        fontFamily: 'GnuolaneRG-Regular',
    },
})
export default Timer;