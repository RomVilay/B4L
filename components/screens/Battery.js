import React from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'

import DeviceInfo from 'react-native-device-info'

import Thunder from '../../assets/Accueil/thunder'

import Bat from '../../assets/Accueil/bat'

var levelBattery = DeviceInfo.getBatteryLevel().then(batteryLevel => {
	levelBattery = batteryLevel
})

var charging = DeviceInfo.isBatteryCharging().then(isCharging => {
	// console.log(isCharging)
	charging = isCharging
})

export default class Battery extends React.Component {
	state = {
		battery: levelBattery,
		charge: charging
	}

	callMe() {
		setInterval(() => {
			this.setState()
		}, 1000)
	}

	render() {
		if (this.state.charge == false) {
			return (
				<View style={styles.withThunder}>
				<View style={styles.batteryContainer}>
					<Text style={styles.battery}>
						{Math.round(this.state.battery * 100)}%
						{this.callMe()}
					</Text>
				</View>
				<View style={styles.battery2}></View>
				</View>

			)
		} else {
			return (
				<View style={[styles.withThunder, { width: '100%' }]}>
					<View style={styles.batteryContainer}>
						<Text style={styles.battery}>
							{Math.round(this.state.battery * 100)}%
						{this.callMe()}
						</Text>
					</View>
					<View style={styles.battery2}></View>
					<View style={{ paddingLeft: 2}}>
						<Thunder></Thunder>
					</View>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	batteryContainer: {
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#5FCDFA'

	},
	battery: {
		color: '#377895',
		width: 60,
		fontSize: 20,
		textAlign: 'center',
		alignSelf: 'center',
		fontFamily: 'GnuolaneRG-Regular'
	},
	battery2: {
    		backgroundColor: '#5FCDFA',
    		width: 4,
    		height:20,
    	},
	withThunder: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
})