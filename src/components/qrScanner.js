import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal } from 'react-native';

import { Button, Icon } from 'react-native-elements';

import Camera from 'react-native-camera';

import Tts from 'react-native-tts';


export default class QrScanner extends React.Component {

	constructor(props) {
    super(props)
    this.state={
      modalVisible: false
    }
	}

	onScan = e => {
   this.props.handleScan(e.data)
  }

  showDetails = () => {

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
	}

	stopAudio = () => {
		Tts.stop()
	}

	startAudio = () => {
    const { scannedData } = this.props;
		if (scannedData && scannedData.audio) {
      Tts.speak(scannedData.audioData)
    }
	}

  render() {
    const { scannedData } = this.props;
		let textToShow = scannedData ? scannedData.text : 'No scanned data'
		if(scannedData && !scannedData.text && (scannedData.audio || scannedData.image ) ) {
			textToShow = 'Text is not selected'
		}
    return (
      <View style={styles.container}>
        <Camera
        style={styles.preview}
        onBarCodeRead={this.onScan}
        ref={cam => this.camera = cam}
        aspect={Camera.constants.Aspect.fill}
        >
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => {
            this.setModalVisible(true);
          }}>
            <Text
              style={styles.text}
              numberOfLines={2}
            >
              {textToShow}
            </Text>
						{
							scannedData && scannedData.audio ?
							<View style={{flexDirection: 'row', marginBottom: 10, alignContent: 'center', justifyContent: 'center'}}>
								<Button
									containerViewStyle={styles.audioIcon}
									rightIcon={{name: 'controller-play', type: 'entypo'}}
									title={'Play'}
									fontSize={14}
									backgroundColor={'#43A047'}
									onPress={this.startAudio}
								/>
								<Button
									containerViewStyle={styles.audioIcon}
									rightIcon={{name: 'stop', type: 'font-awesome'}}
									title={'Stop'}
									fontSize={14}
									backgroundColor={'#e53935'}
									onPress={this.stopAudio}
								/>
							</View>
							:
							null
						}
          </TouchableOpacity>
          {
            scannedData && scannedData.image ?
              <Image
                style={styles.img}
                source={{uri: scannedData.image}}
              />
            :
              null
          }
        </View>
        <Button
          containerViewStyle={styles.buttonContainer}
          large
          rightIcon={{name: 'logout', type: 'material-community'}}
          title='Logout'
          backgroundColor={'#4DD0E1'}
          onPress={this.props.handleLogout}
        />
        </Camera>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.text, {color: '#000'}]}>{textToShow}</Text>
              <Button
                containerViewStyle={styles.buttonContainer}
                large
                rightIcon={{name: 'close', type: 'material-community'}}
                title='Close details'
                backgroundColor={'#4DD0E1'}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%'
  },
  buttonContainer: {
		padding: 20,
    width: 200,
    height: 30,
    marginBottom: 25
	},
	audioIcon: {
		height: 40
	},
  textContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    padding: 10
  },
  img: {
    width: 200,
    height: 150,
  }
});
