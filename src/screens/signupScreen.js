import React, { Component } from 'react';

import { View, Text, StyleSheet, BackHandler } from 'react-native';

import { Button } from 'react-native-elements';

export default class SignupScreen extends Component {

	constructor(props) {
		super(props)
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

  render() {
    return (
			<View style={styles.container}>
				<Button
					buttonStyle={styles.buttonContainer}
					large
					icon={{name: 'arrow-back'}}
					title='Go back'
					backgroundColor={'#37474F'}
					onPress={this.props.goBack}
				/>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
		flex: 1
	},

	buttonContainer: {
		paddingLeft: 20,
		width: 150,
		marginBottom: 20
	},
});
