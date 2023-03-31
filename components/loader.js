import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Lottie from 'lottie-react-native';

const loader = () => {
  return (
    <View  style={styles.cover}>
        
        <Lottie source={require('../assets/loading.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    cover:{
      height: '100%',
      width: '100%',
      backgroundColor: '#FFFFFF'
    }
  })

export default loader