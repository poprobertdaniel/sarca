import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import Permissions from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends React.Component {

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

	onSuccess = e => {
   this.setState({
		 data: e.data
	 })
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
						data fain: {this.state.data}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
				}
				reactivate={true}
				reactivateTimeout={2000}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
