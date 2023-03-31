import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const View_apprehended_details_PN_apprehended = ({viewPlateNumber, setViewPlateNumberDetails}) => {
    const crime =[
        {key:1, value:'Carnap'},
        {key:2, value:'Hit and Run'}
      ]
      const [selected, setSelected] = useState('');

      const [selectCrime, setSelectCrime] = useState('');

      const [plateNumber, setPlateNumber] = useState(viewPlateNumber);
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
      const [apprehended, setApprehended] = useState('');

      //read
    useEffect(() => {
      console.log('fgd')
      onValue(ref(db, `/Vehicle_with_criminal_offense/${viewPlateNumber}`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {

          setSelectCrime(data.criminalOffense)
          
          setMvFileNumber(data.mvFileNumber);
          setMake(data.make);
          setSeries(data.series);
          setBodyType(data.bodyType);
          setBodyNumber(data.bodyNumber);
          setYearModel(data.yearModel);
          setFuel(data.fuel);
          setEngineNumber(data.engineNumber);
          setChassisNumber(data.chassisNumber);
          setDenomination(data.denomination);
          setPistonDisplacement(data.pistonDisplacement);
          setNumberOfCylinders(data.numberOfCylinders);
          setGrossWT(data.grossWT);
          setNetWT(data.netWT);
          setShippingWT(data.shippingWT);
          setNetCapacity(data.netCapacity);
          setCompleteOwnerName(data.completeOwnerName);
          setCompleteAddress(data.completeAddress);
          setORNumber(data.ORNumber);
          setORDate(data.ORDate);
          setApprehended(data.apprehended)
        }
      });
    }, []);
      return (
        <View>
          <View style={styles.display_PN_container}>
            <Text style={styles.label}>View Apprehended Vehicle</Text>
          </View >
          <View style={styles.form_container}>
            <ScrollView>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Plate number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Plate number' value={plateNumber.split("_")[0]} onChangeText={(e)=>setPlateNumber(e)}/>
              </View>
              <View style={styles.select_crime}>
                <Text style={styles.textfield_Label}>Criminal Offense:</Text>
                {/* <SelectList data={crime} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} defaultOption={crime[selectCrime]} dropdownStyles={{backgroundColor: '#FFFFFF', zIndex: 1}}/> */}
                <TextInput style={styles.textfield} editable={false} placeholder='Criminal Offense' value={selectCrime} onChangeText={(e)=>setPlateNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>MV File Number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='MV File Number' value={mvFileNumber} onChangeText={(e)=>setMvFileNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Make:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Make' value={make} onChangeText={(e)=>setMake(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Series:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Series' value={series} onChangeText={(e)=>setSeries(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Body Type:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Body Type' value={bodyType} onChangeText={(e)=>setBodyType(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Body Number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Body Number' value={bodyNumber} onChangeText={(e)=>setBodyNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Year Model:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Year Model' value={yearModel} onChangeText={(e)=>setYearModel(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Fuel:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Fuel' value={fuel} onChangeText={(e)=>setFuel(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Engine Number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Engine Number' value={engineNumber} onChangeText={(e)=>setEngineNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Chassis Number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Chassis Number' value={chassisNumber} onChangeText={(e)=>setChassisNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Denomination:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Denomination' value={denomination} onChangeText={(e)=>setDenomination(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Piston Displacement:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Piston Displacement' value={pistonDisplacement} onChangeText={(e)=>setPistonDisplacement(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Number of Cylinders:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Number of Cylinders' value={numberOfCylinders} onChangeText={(e)=>setNumberOfCylinders(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Gross WT.:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Gross WT.' value={grossWT} onChangeText={(e)=>setGrossWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Net WT.:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Net WT.' value={netWT} onChangeText={(e)=>setNetWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Shipping WT.:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Shipping WT.' value={shippingWT} onChangeText={(e)=>setShippingWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Net Capacity:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Net Capacity' value={netCapacity} onChangeText={(e)=>setNetCapacity(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Complete Owner's Name:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Complete Owner`s Name' value={completeOwnerName} onChangeText={(e)=>setCompleteOwnerName(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Complete Address:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='Complete Address' value={completeAddress} onChangeText={(e)=>setCompleteAddress(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>OR Number:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='OR Number' value={ORNumber} onChangeText={(e)=>setORNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>OR Date:</Text>
                <TextInput style={styles.textfield} editable={false} placeholder='OR Date' value={ORDate} onChangeText={(e)=>setORDate(e)}/>
              </View>
            </ScrollView>
          </View>
    
          <View style={styles.btns_Container}>
            <TouchableOpacity style={styles.saveBtn} onPress={() =>setViewPlateNumberDetails(false)}>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
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
        marginBottom: 5
      },
    
      textfield_Container: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 13,
        
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
        color: '#000000',
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
        marginTop: 10,
      },
    
      saveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2666FA',
        width: '100%'
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
export default View_apprehended_details_PN_apprehended