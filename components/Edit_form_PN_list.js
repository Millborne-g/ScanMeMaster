import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Edit_form_PN_list = ({setEditForm,editPlateNumber}) => {
    const crime =[
        {key:1, value:'Carnap'},
        {key:2, value:'Hit and Run'}
      ]
      const [selected, setSelected] = useState('');

      const [selectCrime, setSelectCrime] = useState(0);

      const [plateNumber, setPlateNumber] = useState(editPlateNumber);
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
      onValue(ref(db, `/Vehicle_with_criminal_offense/${editPlateNumber}`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          console.log('data.plateNumber '+data.plateNumber)
          if(data.criminalOffense === crime[0].value){
            setSelectCrime(0)
          }
          else{
            setSelectCrime(1)
          }
          
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

    const Save_Edit_Submit = () =>{
      try{
        let CO = crime[[selected-1]].value;
        //let apprehended = 'no';
        setCriminalOffense(CO);
        if (plateNumber === '' || mvFileNumber === '' || make === '' || series === '' || bodyType === '' || bodyNumber === '' || yearModel === '' || fuel === '' || engineNumber === '' || chassisNumber === '' || denomination === '' || pistonDisplacement === '' || numberOfCylinders === '' || grossWT === '' || netWT === '' || shippingWT === '' || netCapacity === '' || completeOwnerName === '' || completeAddress === '' || ORNumber === '' || ORDate === ''){
          console.log("yow ")
          alert("Please fill out all fields!");
          console.log(plateNumber+' | '+criminalOffense+' | '+mvFileNumber+' | '+make+' | '+series+' | '+bodyType+' | '+bodyNumber+' | '+yearModel+' | '+fuel+' | '+engineNumber+' | '+chassisNumber+' | '+denomination+' | '+pistonDisplacement+' | '+numberOfCylinders+' | '+grossWT+' | '+netWT+' | '+shippingWT+' | '+netCapacity+' | '+completeOwnerName+' | '+completeAddress+' | '+ORNumber+' | '+ORDate)
          
        }
        else {
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
            ORDate
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
          
          setEditForm(false);
          alert("Vehicle saved!");
          
        }
  
      }catch(err){
        console.log('Errorrr '+err);
        alert("Please fill out all fields!");
      }
      
        
    }
      return (
        <View>
          <View style={styles.display_PN_container}>
            <Text style={styles.label}>Edit Vehicle with Criminal Offense</Text>
          </View >
          <View style={styles.form_container}>
            <ScrollView>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Plate number:</Text>
                <TextInput style={styles.textfield} placeholder='Plate number' value={plateNumber} onChangeText={(e)=>setPlateNumber(e)}/>
              </View>
              <View style={styles.select_crime}>
                <Text style={styles.textfield_Label}>Criminal Offense:</Text>
                <SelectList data={crime} maxHeight={100} search={false} setSelected={(val) => setSelected(val)} defaultOption={crime[selectCrime]} dropdownStyles={{backgroundColor: '#FFFFFF', zIndex: 1}}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>MV File Number:</Text>
                <TextInput style={styles.textfield} placeholder='MV File Number' value={mvFileNumber} onChangeText={(e)=>setMvFileNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Make:</Text>
                <TextInput style={styles.textfield} placeholder='Make' value={make} onChangeText={(e)=>setMake(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Series:</Text>
                <TextInput style={styles.textfield} placeholder='Series' value={series} onChangeText={(e)=>setSeries(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Body Type:</Text>
                <TextInput style={styles.textfield} placeholder='Body Type' value={bodyType} onChangeText={(e)=>setBodyType(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Body Number:</Text>
                <TextInput style={styles.textfield} placeholder='Body Number' value={bodyNumber} onChangeText={(e)=>setBodyNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Year Model:</Text>
                <TextInput style={styles.textfield} placeholder='Year Model' value={yearModel} onChangeText={(e)=>setYearModel(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Fuel:</Text>
                <TextInput style={styles.textfield} placeholder='Fuel' value={fuel} onChangeText={(e)=>setFuel(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Engine Number:</Text>
                <TextInput style={styles.textfield} placeholder='Engine Number' value={engineNumber} onChangeText={(e)=>setEngineNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Chassis Number:</Text>
                <TextInput style={styles.textfield} placeholder='Chassis Number' value={chassisNumber} onChangeText={(e)=>setChassisNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Denomination:</Text>
                <TextInput style={styles.textfield} placeholder='Denomination' value={denomination} onChangeText={(e)=>setDenomination(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Piston Displacement:</Text>
                <TextInput style={styles.textfield} placeholder='Piston Displacement' value={pistonDisplacement} onChangeText={(e)=>setPistonDisplacement(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Number of Cylinders:</Text>
                <TextInput style={styles.textfield} placeholder='Number of Cylinders' value={numberOfCylinders} onChangeText={(e)=>setNumberOfCylinders(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Gross WT.:</Text>
                <TextInput style={styles.textfield} placeholder='Gross WT.' value={grossWT} onChangeText={(e)=>setGrossWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Net WT.:</Text>
                <TextInput style={styles.textfield} placeholder='Net WT.' value={netWT} onChangeText={(e)=>setNetWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Shipping WT.:</Text>
                <TextInput style={styles.textfield} placeholder='Shipping WT.' value={shippingWT} onChangeText={(e)=>setShippingWT(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Net Capacity:</Text>
                <TextInput style={styles.textfield} placeholder='Net Capacity' value={netCapacity} onChangeText={(e)=>setNetCapacity(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Complete Owner's Name:</Text>
                <TextInput style={styles.textfield} placeholder='Complete Owner`s Name' value={completeOwnerName} onChangeText={(e)=>setCompleteOwnerName(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>Complete Address:</Text>
                <TextInput style={styles.textfield} placeholder='Complete Address' value={completeAddress} onChangeText={(e)=>setCompleteAddress(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>OR Number:</Text>
                <TextInput style={styles.textfield} placeholder='OR Number' value={ORNumber} onChangeText={(e)=>setORNumber(e)}/>
              </View>
              <View style={styles.textfield_Container}>
                <Text style={styles.textfield_Label}>OR Date:</Text>
                <TextInput style={styles.textfield} placeholder='OR Date' value={ORDate} onChangeText={(e)=>setORDate(e)}/>
              </View>
            </ScrollView>
          </View>
    
          <View style={styles.btns_Container}>
            <Pressable style={styles.saveBtn} onPress={() => 
              {
                Save_Edit_Submit()
              }}>
              <Text style={styles.btnText}>Update</Text>
            </Pressable>
            <Pressable style={styles.cancelBtn} onPress={() => setEditForm(false) }>
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
export default Edit_form_PN_list