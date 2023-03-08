import React from 'react';
import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import goTo from '../utils/navFunctions';
import Navigation from '../../assets/navigation';
import NavigationReverse from '../../assets/navigation_reverse';

const deviceHeight = Dimensions.get('window').height;
class BottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  render() {
    let {show} = this.state;
    const {onTouchOutside, navigation, route} = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.main}>
            <View>
              {!show ? (
                <TouchableWithoutFeedback onPress={() => this.show()} >
                  <View style={{height:50}}>
                  <Navigation />
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
              <Modal
                animationType={'slide'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom:10
                  }}>
                  {this.renderOutsideTouchable(onTouchOutside)}
                  <View style={styles.navAppContainer}>
                    <NavigationReverse
                      onPress={() => {
                        this.close();
                      }}
                    />
                    <View style={styles.logos}>
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          this.close();
                          goTo(this.props);
                        }}>
                        <Image source={require('../../assets/home.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          this.close();
                          navigation.navigate('Parametres');
                        }}>
                        <Image
                          style={{width: 36, resizeMode: 'contain'}}
                          source={require('../../assets/profile.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          this.close();
                          navigation.navigate('Parametres2');
                        }}>
                        <Image source={require('../../assets/settings.png')} />
                      </TouchableOpacity>
                      {route === 'Parametres2' || route === 'Parametres' ? (
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => {
                            this.close();
                            navigation.navigate('Termes');
                          }}>
                          <Image source={require('../../assets/i.png')} />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default (NavApp = props => {
  let popupRef = React.createRef();

  // Ferme la popup quand on clique en dehors
  const onClosePopup = () => {
    popupRef.close();
  };

  return (
    <>
      <BottomPopup
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        navigation={props.navigation}
        route={useRoute().name}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // flex: 1,
  },
  main: {
    position: 'absolute',
    bottom: 10,
    height:50,
  },
  navAppContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // paddingHorizontal: 10,
    maxHeight: deviceHeight * 0.15,
    paddingBottom:6
  },
  logos: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    // zIndex: 100,
    marginBottom: 5,
    marginTop: 10,
  },
  item: {
    width: 80,
    height: 50,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
});
