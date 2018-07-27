import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, StyleSheet, Switch, YellowBox, AsyncStorage} from 'react-native';

export default class SideMenu extends Component {

	constructor(props) {
		super(props)
		this.state = {
			text: true,
			image: false,
			audio: false
		}

		YellowBox.ignoreWarnings(
      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
	}

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
	}

	switchText = () => {
		AsyncStorage.setItem('requestData', JSON.stringify({
			requestData: [
				{
					text: !this.state.text
				},
				{
					image: this.state.image
				},
				{
					audio: this.state.audio
				}
			]
		}))
			.then( () => {
				this.setState({
					text: !this.state.text
				})
			})
	}

	switchImage = () => {
		AsyncStorage.setItem('requestData', JSON.stringify({
			requestData: [
				{
					text: this.state.text
				},
				{
					image: !this.state.image
				},
				{
					audio: this.state.audio
				}
			]
		}))
			.then( () => {
				this.setState({
					image: !this.state.image
				})
			})
	}

	switchAudio = () => {
		AsyncStorage.setItem('requestData', JSON.stringify({
			requestData: [
				{
					text: this.state.text
				},
				{
					image: this.state.image
				},
				{
					audio: !this.state.audio
				}
			]
		}))
			.then( () => {
				this.setState({
					audio: !this.state.audio
				})
			})
	}

  render () {
    return (
      <View style={styles.container}>
				<View style={styles.row}>
        	<Text style={styles.text}>Text</Text>
					<Switch
						onTintColor={'#00838F'}
						value={this.state.text}
						onValueChange={this.switchText}
					>
					</Switch>
				</View>
        <View style={styles.row}>
        	<Text style={styles.text}>Image</Text>
					<Switch
						onTintColor={'#00838F'}
						value={this.state.image}
						onValueChange={this.switchImage}
					>
					</Switch>
				</View>
				<View style={styles.row}>
        	<Text style={styles.text}>Audio</Text>
					<Switch
						onTintColor={'#00838F'}
						value={this.state.audio}
						onValueChange={this.switchAudio}
					>
					</Switch>
				</View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
		flex: 1,
		paddingLeft: 20
	},
	row: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	text: {
		marginRight: 20,
		width: 100
	}
});