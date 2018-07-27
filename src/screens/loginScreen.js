import React from 'react';

import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			cameraPermission: false,
			data: null,
			userData: null
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('userData', (err, user) => {
			if(err) this.setState({userData: null})
			this.setState({
				userData: JSON.parse(user)
			})
		})
	}

  render() {
    return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.buttonContainer}>
						<Text>
							Log in
						</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonContainer}>
						<Text>
							Sign up
						</Text>
				</TouchableOpacity>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		padding: 20,
		flex: 1
	},
	text: {
		marginRight: 20,
		width: 100
	}
});
