import React, { Component } from 'react';

import { View, Text, StyleSheet, BackHandler, AsyncStorage } from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { isValidEmail, promiseRequest } from '../utils';
import { API } from '../constants/index';


export default class SignupScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			emailError: '',
			password: '',
			passwordError: '',
			serverError: '',
			userName: '',
			userNameError: ''
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.goBack();
		return true;
	}

	updateEmail = email => {
		this.setState({
      emailError: '',
      email
    })
	}

	updateUsername = userName => {
		this.setState({
      userName
    })
	}

	updatePassword = password => {
    this.setState({
      passwordError: '',
      password
    })
	}

	handleSignup = () => {
		if (this.state.email === '' && this.state.password === '') {
      this.setState({ emailError: 'Enter an email address', passwordError: 'Enter a password'})
      return
    } else if ( this.state.email === '' ) {
      this.setState({ emailError: 'Enter an email address' })
      return
		} else if (this.state.userName === '') {
			this.setState({ userNameError: 'Enter a username' })
      return
		} else if ( !isValidEmail(this.state.email.trim()) ) {
      this.setState({
        emailError: 'Wrong email format'
      })
      return
    } else if ( this.state.password === '' ) {
      this.setState({ passwordError: 'Enter a password' })
      return
    } else {
			const data = {
				user: {
					email: this.state.email,
					password: this.state.password,
					username: this.state.userName
				}
			}

			promiseRequest('POST', API.signup, data)
				.then( resp => {
					if(resp.status === 204) {
						this.setState({serverError: 'Username or Email already exists'})
						return
					}
					if (resp.status === 500) {
						this.setState({serverError: 'Server error. Failed to create user'})
						return
					}
					AsyncStorage.setItem('userData', JSON.stringify(data))
						.then( () => {
							this.props.handleSignup()
						})
				})
				.catch( err => {
					console.log('err', err)
				})
    }
	}

  render() {
    return (
			<View style={styles.container}>
				<Button
					buttonStyle={styles.buttonContainer}
					fontSize={14}
					icon={{name: 'arrow-back'}}
					title='Go back'
					color={'#fff'}
					backgroundColor={'#37474F'}
					onPress={this.props.goBack}
				/>
				<FormLabel labelStyle={styles.label}>Email</FormLabel>
					<FormInput
						underlineColorAndroid='transparent'
						onChangeText={this.updateEmail}
						textInputRef={'email'}
						autoCorrect={false}
						keyboardType={'email-address'}
						autoCapitalize={'none'}
						placeholder={'Email'}
						inputStyle={styles.input}
						placeholderTextColor={'#424242'}
				/>
				{
					this.state.emailError ?
						<FormValidationMessage>{this.state.emailError}</FormValidationMessage>
					:
						null
				}
				<FormLabel labelStyle={styles.label}>Username</FormLabel>
					<FormInput
						underlineColorAndroid='transparent'
						onChangeText={this.updateUsername}
						textInputRef={'username'}
						autoCorrect={false}
						autoCapitalize={'none'}
						placeholder={'Username'}
						inputStyle={styles.input}
						placeholderTextColor={'#424242'}
				/>
				{
					this.state.userNameError ?
						<FormValidationMessage>{this.state.userNameError}</FormValidationMessage>
					:
						null
				}
				<FormLabel labelStyle={styles.label}>Password</FormLabel>
				<FormInput
					underlineColorAndroid='transparent'
					onChangeText={this.updatePassword}
					textInputRef={'pwd'}
					autoCorrect={false}
					secureTextEntry={true}
					placeholder={'Password'}
					inputStyle={styles.input}
					placeholderTextColor={'#424242'}
				/>
				<FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
				{
					this.state.serverError ?
						<Text style={styles.errMessage}>{this.state.serverError}</Text>
					:
						null
				}
				<Button
					buttonStyle={styles.signupBtn}
					fontSize={14}
					rightIcon={{name: 'add-user', type: 'entypo'}}
					title='Sign up'
					backgroundColor={'#4DD0E1'}
					onPress={this.handleSignup}
				/>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
	},
	buttonContainer: {
		width: 150,
		height: 40,
		marginBottom: 20
	},
	input: {
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 10,
		fontSize: 14,
		color: '#424242'
	},
	label: {
    color: '#666',
    fontSize: 14
	},
	signupBtn: {
		justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
		marginTop: 15,
		marginRight: 50,
		marginLeft: 50,
		height: 40
	},
	errMessage: {
		textAlign: 'center',
		fontSize: 16,
		color: '#d32f2f'
	}
});
