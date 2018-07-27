import React from 'react';

import Permissions from 'react-native-permissions';

import QrScanner from '../components/qrScanner';

import { AsyncStorage, View, Text } from 'react-native';

import LoginScreen from './loginScreen';

export default class HomeScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			cameraPermission: false,
			data: null,
			userData: null
		}
	}

	componentDidMount() {
		Permissions.request('camera').then(response => {
      this.setState({ cameraPermission: response })
		})
		AsyncStorage.getItem('userData', (err, user) => {
			if(err) this.setState({userData: null})
			this.setState({
				userData: JSON.parse(user)
			})
		})
	}

	onScanComplete = data => {
		AsyncStorage.getItem('requestData', (err, data) => {
			const jsonData = JSON.parse(data)
			console.log(jsonData)
			this.setState({
				data
			})
		})
	}

	renderForm = () => {
		return (
			<LoginScreen></LoginScreen>
		)
	}

  render() {
		const {userData} = this.state
    return (
			<View>
				{
					userData ?
						<QrScanner
							handleScan={data => { this.onScanComplete(data) }}
							scannedData={this.state.data}
						>
						</QrScanner>
	
					:
					this.renderForm()
				}
			</View>
    );
  }
}
