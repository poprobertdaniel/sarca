import React, { Component } from 'react';
 
import { View, TouchableOpacity } from 'react-native';

import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/homeScreen';

import SideMenu from './components/sideMenu';

import { Icon } from 'react-native-elements';

const actions = {
  init() {
    return { userLogged: false }
  },
  logUser() {
    return { userLogged: true }
  },
  logoutUser() {
    return{ userLogged: false }
  }
}

class HamburgerIcon extends Component {

  state=actions.init();

  toggleDrawer=()=>{
    this.props.navigationProps.toggleDrawer();
  }
 
  render() {

    return (

      <View style={{flexDirection: 'row'}}>
 
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Icon
						name='menu'
						color='#fff'
						iconStyle={{marginLeft: 20}}
					/>

        </TouchableOpacity>

      </View>
    
    );

  
  }
}

const HomeScreenStack = StackNavigator({
	First: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Qr Scanner',
			headerLeft : <HamburgerIcon navigationProps={ navigation }/>,
			headerStyle: {
				backgroundColor: '#26C6DA'
			},
			headerTintColor: '#EEEEEE',
		})
	},
});

export default App = DrawerNavigator({
	MainStack: {
    screen: HomeScreenStack
  }
	}, {
		contentComponent: SideMenu,
		drawerWidth: 300
});
