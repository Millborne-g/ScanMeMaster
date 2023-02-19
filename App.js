import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity  } from 'react-native';
import { useState } from 'react';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Vehicles_list from './screens/Vehicles_list';
import TabNavigator from './screens/TabNavigator';
//import BottonNav from './components/BottonNav';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [dashboard, setDashboard] = useState(true);
  const [list, setList] = useState(false);
  const [archive, setArchive] = useState(false);
  const [apprehended, setApprehended] = useState(false);

  const [nav, setNav] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const [user, setUser] = useState('')

  
  return (
    <>
    <StatusBar style="auto" />
    {nav? 
      <TabNavigator user={user} setNav={setNav}/>
      :
      <Login setNav={setNav} setUser={setUser}/>
    }
    
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navigationBar: {
    width: '100%',
    height: 85,
    backgroundColor: '#E4F1F8',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});
