import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Dashboard';
import Vehicles_list from './Vehicles_list';
import Archive from './Archive';
import Apprehended from './Apprehended';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: { 
                paddingTop: 10,
                paddingBottom: 10, 
                height: 70,
                backgroundColor: '#E4F1F8',
            },
            tabBarLabelStyle:{
                fontSize: 10,
            }
        }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (  
                <MaterialCommunityIcons name="view-dashboard-outline" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Vehicles List" component={Vehicles_list} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="playlist-edit" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Archive" component={Archive} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="archive-eye-outline" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Apprehended" component={Apprehended} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="car-back" size={30} color={color} />
              ),
          }}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator