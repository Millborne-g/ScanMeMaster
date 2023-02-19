import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';

const Add_form_PN_list = ({setForm}) => {
  const data =[
    {key:'1', value:'Carnap'},
    {key:'2', value:'Hit and Run'}
  ]
  const [selected, setSelected] = useState('');
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
          <View style={styles.select_crime}>
            <Text style={styles.textfield_Label}>Criminal Offense:</Text>
            <SelectList data={data} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} />
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>MV File Number:</Text>
            <TextInput style={styles.textfield} placeholder='MV File Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Make:</Text>
            <TextInput style={styles.textfield} placeholder='Make'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Series:</Text>
            <TextInput style={styles.textfield} placeholder='Series'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Body Type:</Text>
            <TextInput style={styles.textfield} placeholder='Body Type'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Body Number:</Text>
            <TextInput style={styles.textfield} placeholder='Body Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Year Model:</Text>
            <TextInput style={styles.textfield} placeholder='Year Model'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Fuel:</Text>
            <TextInput style={styles.textfield} placeholder='Fuel'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Engine Number:</Text>
            <TextInput style={styles.textfield} placeholder='Engine Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Chassis Number:</Text>
            <TextInput style={styles.textfield} placeholder='Chassis Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Denomination:</Text>
            <TextInput style={styles.textfield} placeholder='Denomination'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Piston Displacement:</Text>
            <TextInput style={styles.textfield} placeholder='Piston Displacement'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Number of Cylinders:</Text>
            <TextInput style={styles.textfield} placeholder='Piston Displacement'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Gross WT.:</Text>
            <TextInput style={styles.textfield} placeholder='Gross WT.'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Net WT.:</Text>
            <TextInput style={styles.textfield} placeholder='Net WT.'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Shipping WT.:</Text>
            <TextInput style={styles.textfield} placeholder='Shipping WT.'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Net Capacity:</Text>
            <TextInput style={styles.textfield} placeholder='Net Capacity'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Complete Owner's Name:</Text>
            <TextInput style={styles.textfield} placeholder='Complete Owner`s Name'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Complete Address:</Text>
            <TextInput style={styles.textfield} placeholder='Complete Address'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>OR Number:</Text>
            <TextInput style={styles.textfield} placeholder='OR Number'/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>OR Date:</Text>
            <TextInput style={styles.textfield} placeholder='OR Date'/>
          </View>
        </ScrollView>
      </View>

      <View style={styles.btns_Container}>
        <Pressable style={styles.saveBtn} onPress={() => alert("Vehicle saved!") }>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn} onPress={() => setForm(false) }>
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
    height: '75%',
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

  select_crime: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 13,
  },

  btns_Container:{
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },

  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2666FA',
    width: 145
  },

  cancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FC3E3E',
    width: 145
  },

  btnText:{
    fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },

  
})


export default Add_form_PN_list