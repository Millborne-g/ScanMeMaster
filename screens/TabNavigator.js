import React, { useState, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './Dashboard';
import Vehicles_list from './Vehicles_list';
import Apprehended from './Apprehended';
import App from '../App';
import Notification from '../components/Notification';
import Apprehended_notification from '../components/Apprehended_notification';
import Recently_scanned_vehicle_location from '../components/Recently_scanned_vehicle_location';

const Tab = createBottomTabNavigator();

const TabNavigator = ({user,setNav}) => {
  const routeScreen = false;
  const tabRef = useRef(null);

  const [viewApprehended, setviewApprehended] = useState(false);
  
  const click_Vehicle_List = (routeScreen) => {
    // Programmatically click the second tab
    
    if(routeScreen===true){
      console.log("click vehicle list");
      tabRef.current?.navigate("Vehicles_List");
    }
    
  };

  return (
    <>
    <NavigationContainer>
        <Tab.Navigator
        //initialRouteName={routeScreen}
        screenOptions={{
          tabBarShowLabel: false,
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
            <Tab.Screen name="Dashboard" children={()=><Dashboard user={user} click_Vehicle_List={click_Vehicle_List} setviewApprehended={setviewApprehended}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (  
                <MaterialCommunityIcons name="view-dashboard-outline" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Vehicles_List" children={()=><Vehicles_list user={user}/>}options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="playlist-edit" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Apprehended" children={()=><Apprehended user={user}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="car-back" size={30} color={color} />
              ),
          }}/>
          <Tab.Screen name="Logout" children={()=><App setNav={setNav(false)}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="logout" size={30} color={color} />
              ),
          }}/>
        </Tab.Navigator>
    </NavigationContainer>
    {viewApprehended &&
        <Recently_scanned_vehicle_location setviewApprehended={setviewApprehended}/>
    }
    
    
    {/**<Notification />
     * <Apprehended_notification />
     * 
    */}
    </>
  )
}

export default TabNavigator