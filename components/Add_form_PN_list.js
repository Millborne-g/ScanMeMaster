import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';
import NetInfo from "@react-native-community/netinfo";

const Add_form_PN_list = ({setForm, setScannedPlateNumberList, setScannedCrimeList, setCurLocList}) => {
  const crime =[
    {key:1, value:'Carnap'},
    {key:2, value:'Hit and Run'}
  ]
  const [selected, setSelected] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [criminalOffense, setCriminalOffense] = useState('');
  const [mvFileNumber, setMvFileNumber] = useState('');
  const [make, setMake] = useState('');
  const [series, setSeries] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [bodyNumber, setBodyNumber] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [denomination, setDenomination] = useState('');
  const [pistonDisplacement, setPistonDisplacement] = useState('');
  const [numberOfCylinders, setNumberOfCylinders] = useState('');
  const [grossWT, setGrossWT] = useState('');
  const [netWT, setNetWT] = useState('');
  const [shippingWT, setShippingWT] = useState('');
  const [netCapacity, setNetCapacity] = useState('');
  const [completeOwnerName, setCompleteOwnerName] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [ORNumber, setORNumber] = useState('');
  const [ORDate, setORDate] = useState('');
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectSubmitted, setSelectSubmitted] = useState(false);
  
  useEffect(()=>{
    NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setIsInternetConnected(state.isConnected);
    });
  },[])

  const checkPlateNumberExist = (PN) =>{
    try{
      let check = false;
      onValue(ref(db, `/Vehicle_with_criminal_offense/${PN}`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          check = true;
        }
      });

      return check;
    }catch(err){
      return false
    }
    
  }

  const addSubmit = () =>{
    if(isInternetConnected === true){
      setSubmitted(true)
      try{
        let CO = crime[[selected-1]].value;

        if (CO != ''){
          setSelectSubmitted(true)
        }
        
        setCriminalOffense(CO);
        
        let apprehended = 'no';
        if (plateNumber === '' || mvFileNumber === '' || make === '' || series === '' || bodyType === '' || bodyNumber === '' || yearModel === '' || fuel === '' || engineNumber === '' || chassisNumber === '' || denomination === '' || pistonDisplacement === '' || numberOfCylinders === '' || grossWT === '' || netWT === '' || shippingWT === '' || netCapacity === '' || completeOwnerName === '' || completeAddress === '' || ORNumber === '' || ORDate === ''){
          console.log("yow ")
          Alert.alert('Message', 'Please fill out all fields!')
          console.log(plateNumber+' | '+criminalOffense+' | '+mvFileNumber+' | '+make+' | '+series+' | '+bodyType+' | '+bodyNumber+' | '+yearModel+' | '+fuel+' | '+engineNumber+' | '+chassisNumber+' | '+denomination+' | '+pistonDisplacement+' | '+numberOfCylinders+' | '+grossWT+' | '+netWT+' | '+shippingWT+' | '+netCapacity+' | '+completeOwnerName+' | '+completeAddress+' | '+ORNumber+' | '+ORDate)
          
        }
        else {
          let isPlateNumberExist = checkPlateNumberExist(plateNumber);
          
          console.log('already existed ' +isPlateNumberExist);

          if(isPlateNumberExist !== true){
            var now = new Date();
            var year = now.getFullYear();
            var month = String(now.getMonth() + 1).padStart(2, "0");
            var day = String(now.getDate()).padStart(2, "0");
            var hours = String(now.getHours()).padStart(2, "0");
            var minutes = String(now.getMinutes()).padStart(2, "0");
            var seconds = String(now.getSeconds()).padStart(2, "0");
            var currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            set(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`), {
              plateNumber, 
              criminalOffense: CO, 
              apprehended,
              mvFileNumber, 
              make, 
              series, 
              bodyType, 
              bodyNumber, 
              yearModel, 
              fuel, 
              engineNumber, 
              chassisNumber,
              denomination, 
              pistonDisplacement, 
              numberOfCylinders, 
              grossWT, 
              netWT, 
              shippingWT, 
              netCapacity, 
              completeOwnerName, 
              completeAddress,
              ORNumber,
              ORDate,
              currentDateTime
            });

            setPlateNumber('');
            setCriminalOffense('');
            setMvFileNumber('');
            setMake(''); 
            setSeries(''); 
            setBodyType('');
            setBodyNumber('');
            setYearModel(''); 
            setFuel('');
            setEngineNumber(''); 
            setChassisNumber('');
            setDenomination('');
            setPistonDisplacement(''); 
            setNumberOfCylinders(''); 
            setGrossWT(''); 
            setNetWT(''); 
            setShippingWT(''); 
            setNetCapacity(''); 
            setCompleteOwnerName(''); 
            setCompleteAddress('');
            setORNumber('');
            setORDate('');

            setScannedPlateNumberList([]); 
            setScannedCrimeList([]); 
            setCurLocList([]);
            setForm(false);
            Alert.alert('Message', 'Vehicle saved!')
           
          } 
          
          else{
            Alert.alert('Message', 'Vehicle already exist!');
          }

          
        }

      }catch(err){
        console.log(err.toString());
        if ("TypeError: undefined is not an object (evaluating 'crime[[selected - 1]].value')"=== err.toString()){
          setSelectSubmitted(true)
          setSelected('')
        }
        Alert.alert('Message', 'Please fill out all fields!');
        
      }
    }
    else{
      Alert.alert('Message', 'Please connect to the internet.');
    }
  }

  return (
    <View>
      <View style={styles.display_PN_container}>
        <Text style={styles.label}>Add Vehicle with Criminal Offense</Text>
      </View >
      <View style={styles.form_container}>
        <ScrollView>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Plate number:</Text> 
            <TextInput style={[
              submitted ?
              (plateNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Plate Number' onChangeText={(e) => setPlateNumber(e)} value={plateNumber}/>
          </View>
          <View style={styles.select_crime}>
            <Text style={styles.textfield_Label}>Criminal Offense:</Text>
            <SelectList data={crime} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} dropdownStyles={{backgroundColor: '#FFFFFF', zIndex: 1}} boxStyles={[selectSubmitted?([selected? {borderColor: "#C6C6C6"} : {borderColor: "#FF9494"}]) : {borderColor: "#C6C6C6"}]}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>MV File Number:</Text>
            <TextInput style={[
              submitted ?
              (mvFileNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='MV File Number' onChangeText={(e) => setMvFileNumber(e)} value={mvFileNumber}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Make:</Text>
            <TextInput style={[
              submitted ?
              (make ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Make' onChangeText={(e) => setMake(e)} value={make}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Series:</Text>
            <TextInput style={[
              submitted ?
              (series ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Series' onChangeText={(e) => setSeries(e)} value={series}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Body Type:</Text>
            <TextInput style={[
              submitted ?
              (bodyType ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Body Type' onChangeText={(e) => setBodyType(e)} value={bodyType}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Body Number:</Text>
            <TextInput style={[
              submitted ?
              (bodyNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Body Number' onChangeText={(e) => setBodyNumber(e)} value={bodyNumber}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Year Model:</Text>
            <TextInput style={[
              submitted ?
              (yearModel ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Year Model' onChangeText={(e) => setYearModel(e)} value={yearModel}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Fuel:</Text>
            <TextInput style={[
              submitted ?
              (fuel ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Fuel' onChangeText={(e) => setFuel(e)} value={fuel}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Engine Number:</Text>
            <TextInput style={[
              submitted ?
              (engineNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Engine Number' onChangeText={(e) => setEngineNumber(e)} value={engineNumber}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Chassis Number:</Text>
            <TextInput style={[
              submitted ?
              (chassisNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Chassis Number' onChangeText={(e) => setChassisNumber(e)} value={chassisNumber}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Denomination:</Text>
            <TextInput style={[
              submitted ?
              (denomination ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Denomination' onChangeText={(e) => setDenomination(e)} value={denomination}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Piston Displacement:</Text>
            <TextInput style={[
              submitted ?
              (pistonDisplacement ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Piston Displacement' onChangeText={(e) => setPistonDisplacement(e)} value={pistonDisplacement}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Number of Cylinders:</Text>
            <TextInput style={[
              submitted ?
              (numberOfCylinders ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Number of Cylinders:' onChangeText={(e) => setNumberOfCylinders(e)} value={numberOfCylinders}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Gross WT.:</Text>
            <TextInput style={[
              submitted ?
              (grossWT ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Gross WT.' onChangeText={(e) => setGrossWT(e)} value={grossWT}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Net WT.:</Text>
            <TextInput style={[
              submitted ?
              (netWT ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Net WT.' onChangeText={(e) => setNetWT(e)} value={netWT}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Shipping WT.:</Text>
            <TextInput style={[
              submitted ?
              (shippingWT ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Shipping WT.' onChangeText={(e) => setShippingWT(e)} value={shippingWT}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Net Capacity:</Text>
            <TextInput style={[
              submitted ?
              (netCapacity ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Net Capacity' onChangeText={(e) => setNetCapacity(e)} value={netCapacity}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Complete Owner's Name:</Text>
            <TextInput style={[
              submitted ?
              (completeOwnerName ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Complete Owner`s Name' onChangeText={(e) => setCompleteOwnerName(e)} value={completeOwnerName}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>Complete Address:</Text>
            <TextInput style={[
              submitted ?
              (completeAddress ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='Complete Address' onChangeText={(e) => setCompleteAddress(e)} value={completeAddress}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>OR Number:</Text>
            <TextInput style={[
              submitted ?
              (ORNumber ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='OR Number' onChangeText={(e) => setORNumber(e)} value={ORNumber}/>
          </View>
          <View style={styles.textfield_Container}>
            <Text style={styles.textfield_Label}>OR Date:</Text>
            <TextInput style={[
              submitted ?
              (ORDate ? styles.textfield: styles.textfieldError) : styles.textfield
              ]} 
              placeholder='OR Date' onChangeText={(e) => setORDate(e)} value={ORDate}/>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding": "height"}>
        <View style={styles.btns_Container}>
          <TouchableOpacity style={styles.saveBtn} onPress={() => addSubmit() }>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => setForm(false) }>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
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
    height: '77%',
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

  textfieldError:{
    borderWidth: 1,
    height: 45,
    borderColor: '#FF9494',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  select_crime: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 13,
    height: 65,
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