import React, { Component } from 'react';

import { AsyncStorage, View, Text, StyleSheet, BackHandler } from 'react-native';

import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import { isValidEmail, promiseRequest } from '../utils';

import { API } from '../constants/index';

export default class LoginScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			emailError: '',
			password: '',
			passwordError: '',
			serverError: ''
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

	updatePassword = password => {
    this.setState({
      passwordError: '',
      password
    })
	}

	handleLogin = () => {
		if (this.state.email === '' && this.state.password === '') {
      this.setState({ emailError: 'Enter an email address', passwordError: 'Enter a password'})
      return
    } else if ( this.state.email === '' ) {
      this.setState({ emailError: 'Enter an email address' })
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
				auth: {
					email: this.state.email,
					password: this.state.password
				}
			}
			promiseRequest('POST', API.getToken, data)
				.then( resp => {
					if(resp.wrongCredetians) this.setState({serverError: 'Wrong email or password'})
					const userData = {token: resp.jwt}
					AsyncStorage.setItem('userData', JSON.stringify(userData))
						.then( () => {
							this.props.handleLogin()
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
					<FormValidationMessage>{this.state.emailError}</FormValidationMessage>
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
							<Text>{this.state.serverError}</Text>
						:
							null
					}
					<Button
						buttonStyle={styles.loginBtn}
						fontSize={14}
						rightIcon={{name: 'login', type: 'material-community'}}
						title='Login'
						backgroundColor={'#4DD0E1'}
						onPress={this.handleLogin}
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
	formContainer: {
		marginTop: 20
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
	loginBtn: {
		justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
		marginTop: 15,
		marginRight: 50,
		marginLeft: 50,
		height: 40
	}
});
