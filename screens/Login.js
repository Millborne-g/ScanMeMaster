import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectList } from 'react-native-dropdown-select-list';

const Login = ({setNav, setUser}) => {
    const data =[
        {key:1, value:'LTO'},
        {key:2, value:'HPG'}
    ]

    const [selected, setSelected] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [viewPassword, setViewPassword]= useState(true);
    const [scaleValue] = useState(new Animated.Value(1));
    const [password, setPassword] = useState('');

    const click_login = () =>{
        setChecked(false);
        try {
            if(password !== ''){
                console.log(data[[selected-1]].value);
                console.log(password);
                let personnel = data[[selected-1]].value;
                setUser(personnel);
                setNav(true);
                setPassword('');
            } else{
                alert("Invalid user and password")
            }
        }
        catch(err) {
            alert("Invalid user and password")
        }
    }

  return (
    <View style={styles.container}>
        {/*<Text>Login</Text>
        <Button title='click me' mode='contained' onPress={() => navigation.navigate('Dashboard')}/>
        */}
        <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')}/>
        </View>   
        <View style={styles.headerContainer}>
            <Text style={styles.header}>ScanMeMaster</Text>
            <Text style={styles.subHeader}>Please Login to continue.</Text>
        </View>
        <View style={styles.textFieldContainer}>
            <Text style={styles.userLabel}>*User</Text>
            <SelectList data={data} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} />
            <View style={styles.dropdownStyle}></View>
            <Text style={styles.passwordLabel}>*Password</Text>
            <View style={styles.passwordTextfieldContainer}>
                <TextInput style={styles.passwordTextfield} placeholder='Password' secureTextEntry={viewPassword} value={password} onChangeText={(e)=>setPassword(e)}/>
                <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setViewPassword(!viewPassword)}>
                    <View>
                        {viewPassword? 
                            <Image source={require('../assets/password-hidden.png')}/>:
                            <Image source={require('../assets/password-view.png')}/>
                        }
                    </View>
                </TouchableOpacity>
                
            </View>
            
            <TouchableOpacity onPress={() => setChecked(!isChecked)}>
                <View style={styles.rememberMeContainer}>
                    <Checkbox style={styles.checbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#000000' : undefined}/>
                    <Text>Remember Me</Text>
                </View>
            </TouchableOpacity>
            

            <Pressable style={styles.loginBtn} onPress={() => click_login()}>
                <Text style={styles.btnText}>Login</Text>
            </Pressable>
            
        </View>
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
        marginBottom: 20,
    },

    headerContainer:{
        alignItems: 'center',
        marginBottom: 20
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 7
    },

    subHeader: {
        fontSize: 14,
    },

    textFieldContainer: {
        width: '85%',
    },

    userLabel:{
        fontSize: 10,
    },

    dropdownStyle: {
        marginBottom: 20
    },

    passwordLabel: {
        fontSize: 10,
    },

    passwordTextfieldContainer:{
        marginBottom: 20
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
        marginBottom: 25
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