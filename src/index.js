import React, { Component } from 'react';
 
import { Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/homeScreen';

import SideMenu from './components/sideMenu';

class HamburgerIcon extends Component {

  toggleDrawer=()=>{
    this.props.navigationProps.toggleDrawer();
  }
 
  render() {

    return (

      <View style={{flexDirection: 'row'}}>
 
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
            style={{ width: 25, height: 25, marginLeft: 5}}
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
