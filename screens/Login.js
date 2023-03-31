import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectList } from 'react-native-dropdown-select-list';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/loader';

const Login = ({setNav, setUser}) => {
    const data =[
        {key:1, value:'LTO'},
        {key:2, value:'HPG'}
    ];

    const [todo, setTodos] = useState("");

    const [selected, setSelected] = useState('');
    const [selectedUser, setSelectedUser] = useState(0);
    const [rememberMeData, setRememberMeData] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [viewPassword, setViewPassword]= useState(true);
    const [scaleValue] = useState(new Animated.Value(1));
    const [password, setPassword] = useState('');
    const [isInternetConnected, setIsInternetConnected] = useState(false);

    const storeData = async () => {
        try {
          const CO = data[[selected-1]].value;
          
          await AsyncStorage.setItem('username', CO);
          await AsyncStorage.setItem('password', password);
        } catch (e) {
          // saving error
        }
      }

      const getData = async () => {
        try {
          const savedUsername = await AsyncStorage.getItem('username');
          const savedPassword = await AsyncStorage.getItem('password');
          if(savedUsername !== null && savedPassword !== null) {
            console.log('data[0].value '+data[0].value);
            console.log('savedPassword '+savedPassword);
            console.log('savedUsername '+savedUsername);
            if(savedUsername === data[0].value){
                setSelectedUser(0)
            }
            else{
                setSelectedUser(1)
            }
            setPassword(savedPassword);
            setRememberMeData(true);
          }
        } catch(e) {
          console.log('e '+ e)
        }
      }

    const login_error = () =>{
        Alert.alert('Message', 'Invalid user or password.');
        // alert("Invalid user or password.");
    }

    useEffect(()=>{
        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setIsInternetConnected(state.isConnected);
        });
        console.log('isInternetConnected '+isInternetConnected);
        getData()
    },[])

    const dashboard = () =>{
        
        let personnel = data[[selected-1]].value;
        setUser(personnel);
        setNav(true);
        setPassword('');
        setChecked(false);
    }

    const click_login = () =>{
        try {
            if(isInternetConnected === true){
                if(password !== ''){
                
                    console.log('data[[selected-1]].value '+data[[selected-1]].value);
                    if(selected === 1){
                        
                        console.log("password");
                        if (password === 'lto123'){
                            if(isChecked === true){
                                storeData();
                            }
                            dashboard();
                        }
                        else{
                            login_error();
                        }
                    }
                    else if (selected === 2){
                        if (password === 'hpg123'){
                            if(isChecked === true){
                                storeData();
                            }
                            dashboard();
                        }
                        else{
                            login_error();
                        }
                    }
                    console.log('is checked '+ isChecked);
                    
                
                    } 
                    else{
                        login_error();
                    }
                } 
            else{
                Alert('Message', 'Please connect to the internet.');
                // alert('Please connect to the internet.');
            }
        }
        catch(err) {
            login_error();
        }
    }

    // //write
    // const submit_to_DB = () =>{
    //     const uuid = uid();
    //     const test = 'test';
    //     set(ref(db, `/${uuid}`), {
    //         test,
    //         uuid,
    //     });

    //     alert('Saved to Database');
    // }

    // //read
    // useEffect(() => {
    //     onValue(ref(db, `/Vehicle_with_criminal_offense`), (snapshot) => {
    //       setTodos([]);
    //       const data = snapshot.val();
    //       if (data !== null) {
    //         Object.values(data).map((todo) => {
    //             console.log(todo.plateNumber)
    //           setTodos((oldArray) => [...oldArray, todo]);
    //         });
    //       }
    //     });
    //   }, []);

    //   //console.log(todo);

    //   //delete
    // const handleDelete = () => {
    //     remove(ref(db, `/${'b90e955ddb5'}`));
    // };

    //  //update
    // const handleSubmitChange = () => {
    //     const test = 'testchange';
    //     update(ref(db, `/${'c04594823fe'}`), {
    //     test,
    //     uuid: 'c04594823fe',
    //     });
    // };


  return (
    <View style={styles.container}>
        
        {/*<Text>Login</Text>
        <Button title='click me' mode='contained' onPress={() => navigation.navigate('Dashboard')}/>
        */}
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
        </View>   
        <View style={styles.headerContainer}>
            <Text style={styles.header}>ScanMeMaster</Text>
            <Text style={styles.subHeader}>Please Login to continue.</Text>
        </View>
        <View style={styles.textFieldContainer}>
            <ScrollView>
                <Text style={styles.userLabel}>*User</Text>
                <View style={styles.selectContainer}>
                    <SelectList data={data} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} inputStyles={{/*height: 23,*/ marginTop: '1%'}} defaultOption={data[selectedUser]} dropdownStyles={{backgroundColor: '#FFFFFF', height: 90, zIndex: 2,}}/>
                </View>
                <Text style={styles.passwordLabel}>*Password</Text>
                <View style={styles.passwordTextfieldContainer}>
                    <TextInput style={styles.passwordTextfield} placeholder='Password' secureTextEntry={viewPassword} value={password} onChangeText={(e)=>setPassword(e)}/>
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setViewPassword(!viewPassword)}>
                        <View>
                            {viewPassword? 
                                <Image source={require('../assets/password-view.png')}/>:
                                <Image source={require('../assets/password-hidden.png')}/>
                            }
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
            
            <TouchableOpacity onPress={() => setChecked(!isChecked)}>
                <View style={styles.rememberMeContainer}>
                    <Checkbox style={styles.checbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#000000' : undefined}/>
                    <Text>Remember Me</Text>
                </View>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.loginBtn} onPress={
                () => click_login() //handleSubmitChange() //handleDelete()//submit_to_DB() //click_login()
                }>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            
        </View>
        {/* <Loader /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoContainer: {
        marginBottom: 10,
        height: 140,
        width: 140,
    },

    logo: {
        height: 140,
        width: 140,
    },

    headerContainer:{
        alignItems: 'center',
        marginBottom: 20
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 7,
        color: '#264E72',
    },

    subHeader: {
        fontSize: 14,
        fontWeight: '400',
        color: '#999EA1',
    },

    textFieldContainer: {
        width: '85%',
    },

    userLabel:{
        fontSize: 10,
    },

    selectContainer:{
        height: 55,
        marginBottom: 10
    },

    passwordLabel: {
        fontSize: 10,
    },

    passwordTextfieldContainer:{
        marginBottom: 20,
    },

    passwordTextfield: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        height: 50,
        paddingRight: 12,
        paddingLeft: 12,
    },

    eyeIconContainer:{
        position: 'absolute',
        right: '3%',
        height: '100%',
        justifyContent: 'center',
    },

    passIconSize: {
    },

    rememberMeContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },

    checbox: {
        marginRight: 6
    },

    loginBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2666FA',
        
      },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },


})

export default Login