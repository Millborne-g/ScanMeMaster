import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Add_form_PN_list = () => {
  return (
    <View>
      <View style={styles.display_PN_container}>
        <Text style={styles.label}>Add Vehicle with Criminal Offense</Text>
      </View >
      <View style={styles.form_container}>
        <ScrollView>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text>
            <TextInput style={styles.textfield} placeholder='Plate Number'/>
          </View>
        </ScrollView>
      </View>

      <View style={styles.btns_Container}>
        <Pressable style={styles.saveBtn}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },

  display_PN_container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20
  },

  label: {
    fontSize: 15,
    color: '#9F9F9F',
    marginBottom: 10
  },

  form_container: {
    height: 450,
  },

  textfield_Container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 13
  },

  textfield_Label: {
    fontSize: 10,
    marginBottom: 5
  },

  textfield: {
    borderWidth: 1,
    height: 45,
    borderColor: '#C6C6C6',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  btns_Container:{
    flexDirection: 'row'
  }
})


export default Add_form_PN_list