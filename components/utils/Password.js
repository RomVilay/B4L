import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function Password(props) {
  const [state, setState] = useState(true);

  const setPasswordVisibility = () => {
    setState({state: !state});
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBoxContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry={state}
          style={styles.textBox}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.touachableButton}
          onPress={setPasswordVisibility}>
          <Image
            source={state ? require('./hide.webp') : require('./view.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textBox: {
    fontSize: 20,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '20%',
    width: '20%',
  },
});
