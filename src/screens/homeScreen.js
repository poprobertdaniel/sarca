import React, { Component } from 'react';

import Permissions from 'react-native-permissions';

import QrScanner from '../components/qrScanner';

import { AsyncStorage, View, StyleSheet } from 'react-native';

import NotLoggedContainer from './notLoggedContainer';
import { promiseRequest } from '../utils';

import { API } from '../constants';

export default class HomeScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cameraPermission: false,
			data: null,
			userData: null
		}
	}

	componentDidMount() {
		AsyncStorage.setItem('requestData', JSON.stringify({
			requestData: [
				{
					text: true
				},
				{
					image: false
				},
				{
					audio: false
				}
			]
		}))
			.then( () => {
				Permissions.request('camera').then(response => {
					this.setState({ cameraPermission: response })
				})
				AsyncStorage.getItem('userData', (err, user) => {
					if(err) this.setState({userData: null})
					this.setState({
						userData: JSON.parse(user)
					})
				})
			})
	}

	showCamera = () => {
		AsyncStorage.getItem('userData', (err, user) => {
			this.setState({
				userData: JSON.parse(user)
			})
		})
	}

	onScanComplete = data => {
		const qrData = data.split('&')
		const id = qrData[0]
		const s = qrData[1]
		AsyncStorage.getItem('requestData', (err, data) => {
			const jsonData = JSON.parse(data)
			const { requestData } = jsonData
			promiseRequest('GET', API.qr(id))
				.then( resp => {
					const { image_url, text_data } = resp
					const filteredData = {};
					for (let i = 0; i < requestData.length; i++) {
						if(requestData[i].text) {
							filteredData.text = text_data
						} else if (requestData[i].audio) {
							filteredData.audio = true
						} else if (requestData[i].image) {
							filteredData.image = image_url
						}
					}
					this.setState({data: filteredData})
				})
				.catch( err => {
					console.log('qr err', err)
				})
		})
	}

	handleLogout = () => {
		AsyncStorage.removeItem('userData')
			.then( () => {
				this.setState({userData: null})
			})
	}


  render() {
		const {userData} = this.state
    return (
			<View style={{flex: 1}}>
				{
					userData ?
						<QrScanner
							handleScan={data => { this.onScanComplete(data) }}
							scannedData={this.state.data}
							handleLogout={this.handleLogout}
						>
						</QrScanner>
					:
						<NotLoggedContainer
							showCamera={this.showCamera}
						>
						</NotLoggedContainer>
				}
			</View>
    );
  }
}
