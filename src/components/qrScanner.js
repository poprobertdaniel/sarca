import React from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Button } from 'react-native-elements';

export default class QrScanner extends React.Component {

	constructor(props) {
		super(props)
	}

	onScan = e => {
   this.props.handleScan(e.data)
  }

  render() {
		const { scannedData } = this.props;
    return (
      <QRCodeScanner
        onRead={this.onScan}
        topContent={
          <Text style={styles.centerText}>
						data fain: {scannedData}
          </Text>
        }
        bottomContent={
          <Button
            containerViewStyle={styles.buttonContainer}
            buttonStyle={{marginTop: 50}}
            large
            rightIcon={{name: 'logout', type: 'material-community'}}
            title='Logout'
            backgroundColor={'#4DD0E1'}
            onPress={this.props.handleLogout}
          />
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
  buttonContainer: {
		padding: 20,
		marginTop: 20,
		width: 300
	},
});
