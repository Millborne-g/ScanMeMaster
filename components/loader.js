import React, { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Lottie from 'lottie-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const loader = () => {
  return (
    <View style={styles.cover}>
      <View style={styles.modal} >
        {/* <AnimatedCircularProgress
                  size={100}
                  width={15}
                  fill={10}
                  tintColor="#00e0ff"
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#3d5875" /> */}
          <ActivityIndicator size = { 75 } color="#2666FA" />
          <Text style={styles.text}>Loading</Text>

      </View>
      
        
        {/* <Lottie source={require('../assets/loading.json')} autoPlay loop/> */}
    </View>
  )
}

const styles = StyleSheet.create({
    cover:{
      height: 170,
      width: 170,
      backgroundColor: '#FFFFFF',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      // backgroundColor:'red',
      // backgroundColor: 'white',
      borderRadius: 25
      
    },

    modal: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    },

    text:{
      color: '#999EA1',
      fontSize: 17,
      marginTop: 15
    }
  })

export default loader