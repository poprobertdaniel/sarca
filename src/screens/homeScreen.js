import React from 'react';

import Permissions from 'react-native-permissions';

import QrScanner from '../components/qrScanner';

import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			cameraPermission: false,
			data: null
		}
	}

	componentDidMount() {
		Permissions.request('camera').then(response => {
      this.setState({ cameraPermission: response })
    })
	}

	onScanComplete = data => {
		AsyncStorage.getItem('text', (err, text) => {
			this.setState({
				data
			})
		})
  }

  render() {
    return (
			<QrScanner
				handleScan={data => { this.onScanComplete(data) }}
				scannedData={this.state.data}
			>
			</QrScanner>
    );
  }
}
