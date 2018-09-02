import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import LoginScreen from './loginScreen';

import SignupScreen from './signupScreen';

export default class NotLoggedContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showLogin: false,
			showsignup: false
		}
	}
	
	toggleRegister = () => {
		this.setState({
			showsignup: !this.state.showsignup
		})
	}

	toggleLogin = () => {
		this.setState({
			showLogin: !this.state.showLogin
		})
	}

  render() {
		if (this.state.showLogin) {
			return(
				<LoginScreen
					goBack={this.toggleLogin}
					handleLogin={this.props.showCamera}
				>
				</LoginScreen>
			)
		}
		if (this.state.showsignup) {
			return (
				<SignupScreen
					goBack={this.toggleRegister}
					handleSignup={this.props.showCamera}
					>
				</SignupScreen>
			)
		}
    return (
			<View style={styles.container}>
				<Button
					containerViewStyle={styles.buttonContainer}
					buttonStyle={{marginTop: 50}}
					large
					rightIcon={{name: 'login', type: 'material-community'}}
					title='Login'
					backgroundColor={'#4DD0E1'}
					onPress={this.toggleLogin}
				/>
				<Button
					containerViewStyle={styles.buttonContainer}
					buttonStyle={{marginTop: 50}}
					large
					rightIcon={{name: 'add-user', type: 'entypo'}}
					title='Sign up'
					backgroundColor={'#4DD0E1'}
					onPress={this.toggleRegister}
				/>
				<View style={{paddingTop: 100}}>
					<Text style={styles.text}>Please login or sign up in order to use the Augumented Reality functionality.</Text>
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
		flex: 1,
		alignItems: 'center'
	},
	buttonContainer: {
		padding: 20,
		marginTop: 20,
		width: 300
	},
	text: {
		fontSize: 16,
		color: '#000',
		padding: 15,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});
