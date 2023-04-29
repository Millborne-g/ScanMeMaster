import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Notification = ({scannedPlateNotification, scannedCrimeNotification, scannedCurLocNotification, setNotification, scannedDetectedPN, scannedColor, scannedClosestMatches, scannedImageLink, setScannedPlateNotification, setScannedCrimeNotification, setScannedCurLocNotification, setScannedDetectedPN, setScannedColor, setScannedClosestMatches, setScannedImageLink, setScannedPlateNumberList, setScannedCrimeList, setCurLocList, setScannedDetectedPNList, setScannedColorList, setScannedClosestMatchesList, setScannedImageLinkList}) => {
    const headers = ["Plate no.", "Crime", 'Confidence'];
    // const archiveRow = [
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],        
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    //     ["Date/Time", "Plate No.", <View style={styles.confidenceLevel}><Text style={styles.confidenceLevelText}>100%</Text></View>],
    // ];

    const [archiveRow, setArchiveRow] = useState([])


    useEffect(() => {
        
        try{
            setArchiveRow([])
            // console.log('dddddddddddddddddddddddd '+scannedClosestMatches)
            
            
            // const string = "[('NBC1234', 'Carnap', 100.0), ('ABC1234', 'Hit and Run', 85.71), ('LBC123A', 'Carnap', 71.43)]"
            // const str = string.replace(/'/g, '"');
            // const arr = JSON.parse(str.replace(/\(/g, "[").replace(/\)/g, "]"))
            // console.log(arr);
            // console.log('dsdadada '+arr[0][0]);

            try{
                const string = scannedClosestMatches;
                const str = string.replace(/'/g, '"');
                const arr = JSON.parse(str.replace(/\(/g, "[").replace(/\)/g, "]"));
                // console.log(arr);
                const filteredData = arr.filter(item => parseInt(item[2]) >= 60);
                if (filteredData.length > 0) {
                    const modifiedData = filteredData.map(item => {
                    var confidenceLevel = <View></View>;
                    if (parseInt(item[2]) >= 60 && parseInt(item[2]) <= 75) {
                        confidenceLevel = <View style={styles.confidenceLevel_yellow}><Text style={styles.confidenceLevelText}>{item[2]}%</Text></View>;
                    } else if (parseInt(item[2]) > 75) {
                        confidenceLevel = <View style={styles.confidenceLevel_red}><Text style={styles.confidenceLevelText}>{item[2]}%</Text></View>;
                    }
                    return [item[0], item[1], confidenceLevel];
                    });
                    setArchiveRow(modifiedData);
                } else{
                    setNotification(false);
                }
                // console.log('modified ', modifiedData);
                
                //   setArchiveRow(modifiedData)

              }catch(e){
                console.log('error inside '+e)

              }
            // setArchiveRow(arr)
            // console.log('ssssssssssssssssssssssss '+archiveRow)
            

        }catch(e){
            console.log('error '+e)

          }
        // const regex = /'([\w\d]+)',\s*([\d.]+)/g;
        // const array = [];
        
        // let match;
        // while ((match = regex.exec('scannedClosestMatches'))) {
        //   array.push([match[1], parseFloat(match[2])]);
        // }
        
    }, [scannedClosestMatches]);



          // const [scannedClosestMatchesList, setScannedClosestMatchesList] = useState([]);
      // const [scannedClosestMatches, setScannedClosestMatches] = useState('');

//       const [scannedImageLinkList, setScannedImageLinkList] = useState([]);  

// const [scannedImageLink, setScannedImageLink] = useState('');






// const [scannedClosestMatchesList, setScannedClosestMatchesList] = useState([]);
      // const [scannedClosestMatches, setScannedClosestMatches] = useState('');
    // const Notification = ({setNotification}) => {

    //let curDateTime = curDateList[curDateList.length -1]+" "+curTimeList[curTimeList.length -1];
    // const [scannedPlateNumberList, setScannedPlateNumberList] = useState('');
    // const [scannedCrimeList, setScannedCrimeList] = useState('');
    // const [curLocList, setCurLocList] = useState('');
    // const [curDateList, setCurDateList] = useState('');
    // const [curTimeList, setCurTimeList] = useState('');
//read
    // useEffect(() => {
    //     onValue(ref(db, `/ScannedNotification`), (snapshot) => {
    //     const data = snapshot.val();
    //     if (data !== null) {
    //         setScannedPlateNumberList(data.PlateNumber);
    //         setScannedCrimeList(data.CriminalOffense);
    //         setCurLocList(data.Location);
    //         // Object.values(data).map((scanned) => {
    //         //     if(scanned.Apprehended === 'no'){
    //         //         setScannedPlateNumberList(scanned.PlateNumber);
    //         //         let crime = '';
    //         //         onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
    //         //             const data = snapshot.val();
    //         //             if (data !== null) {
    //         //                 setScannedCrimeList(data.criminalOffense);
    //         //                 // console.log('hereeeeeeeeeeeeeee '+data.criminalOffense+' '+data.plateNumber+' '+scanned.PlateNumber)
    //         //             }
    //         //           });
    //         //         //   setScannedCrimeList(scanned.CriminalOffense);
    //         //           setCurLocList(scanned.Location);
    //         //           setCurDateList(scanned.Date);
    //         //           setCurTimeList(scanned.Time);
    //         //     }
    //         // });
    //     }
    //     });
    //     console.log("it worked");
    // }, []);
    const handleSubmitChange = () => {
        // // update(ref(db, `/Scanned/${curDateTime}`), {
        // //     Notification : "off"
        // // });
        // let scannedDateTime = []
        // onValue(ref(db, `/Scanned`), (snapshot) => {
          
        //   const data = snapshot.val();
        //   if (data !== null) {
        //     Object.values(data).map((scanned) => {
        //         scannedDateTime.push(scanned.Date+' '+scanned.Time);
                
        //     });
        //     console.log('yooooow '+data)
        //   }
        // });
        // scannedDateTime.map((value)=>{
        //     update(ref(db, `/Scanned/${value}`), {
        //         Notification : "off"
        //     });
        // })
        // scannedDateTime=[];
        // curDateList.map((item, index) =>{
        //     update(ref(db, `/Scanned/${curDateList[index]+' '+curTimeList[index]}`), {
        //         Notification : "off"
        //     });
        // })
        // setScannedPlateNumberList([]);
        // setScannedCrimeList([]);
        // setCurLocList([]);
        setScannedPlateNotification('');
        setScannedCrimeNotification('');
        setScannedCurLocNotification('');
        setScannedDetectedPN(''); 
        setScannedColor(''); 
        setScannedClosestMatches('');
        setScannedImageLink('');
        setScannedPlateNumberList([]); 
        setScannedCrimeList([]); 
        setCurLocList([]);
        setScannedDetectedPNList([]);
        setScannedColorList([]);
        setScannedClosestMatchesList([]); 
        setScannedImageLinkList([]);
        setArchiveRow([]);
        set(ref(db, `/ScannedNotification`), {}) 
        set(ref(db, `/ScannedPlateNumberNotification`), {}) 
        setNotification(false);
      };
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <View style={styles.img_bg}>
                {/* <Image style={styles.warning_img} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/scanmemaster-9da58.appspot.com/o/2023-04-29%2017%3A50%3A22%20NBC1234.jpg?alt=media'}}/> */}
                <Image style={styles.warning_img} source={{uri: scannedImageLink}}/>

                </View>
                <View style={styles.img_bg_cover}>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.03)', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ height: '40%', width: '100%', position: 'absolute', bottom:0 }}
                    />
                </View>
            {/* <View style={styles.warning_img_bg}>
            {
                scannedColor === 'yellow' ? 
                <Image style={styles.warning_img} source={require('../assets/yellow.png')}/>:
                <Image style={styles.warning_img} source={require('../assets/red.png')}/>
                }
            </View> */}
            <Text style={styles.plate_Number_Label}>Conversion:</Text> 
            {/* <Text style={styles.plate_Number}>NBC-XXX</Text>  */}
            <Text style={styles.plate_Number}>{scannedDetectedPN}</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            {/* <Text style={styles.location}>Lapasan Zone 4</Text> */}
            <Text style={styles.location}>{scannedCurLocNotification}</Text>
            <Text style={styles.crime_Label}>Closest Match:</Text>
            <View style={styles.Display_archive_table_matches_dashboard_container}>
            <View style={styles.box_container}>
        
            <Table >
                    <Row
                        data={headers}
                        height={40}
                        flexArr={[1.3,1.2,1.2]}
                        
                        textStyle={{
                            paddingLeft: 10,
                            color: '#9F9F9F',
                            fontSize: 13,
                            
                        }}
                        style={{
                            backgroundColor: '#F0F0F0',
                            top: 0,
                            width: '100%',
                            borderBottomWidth: 0.5,
                            borderColor: '#9F9F9F',
                            paddingLeft: -3,
                            paddingRight: 3
                        }}
                    />
                </Table>
            <ScrollView style={{marginTop: -1}}>
                {/* { listEmpty? 
                <View style={styles.noDataAvailable}>
                    <Text>
                        No Data Available
                    </Text>
                </View> : */}
                <Table >
                    <TableWrapper style={{
                        flexDirection: 'row',
                        }}>
                        <Rows 
                            data={archiveRow} 
                            height={60} 
                            flexArr={[1.3,1.2,1.2]}
                            textStyle={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 13
                            }}

                            style={{
                                borderBottomWidth: 0.5,
                                borderColor: '#9F9F9F',
                                paddingLeft: -3,
                                paddingRight: 3
                            }}
                            /> 
                    </TableWrapper>
                </Table>
            {/* } */}
                
            </ScrollView>
        </View> 
        </View>
            {/* <Text style={styles.crime}>{scannedPlateNotification}</Text> 
            <Text style={styles.crime_Label}>Criminal Offense:</Text> 
            <Text style={styles.crime}>{scannedCrimeNotification}</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            <Text style={styles.location}>{scannedCurLocNotification}</Text> */}
            <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                <View style={styles.okBtnBg}></View>
                <MaterialCommunityIcons name="close" size={45} color={"white"} />
                
            </Pressable>
        </View>
    
    {
    // <View style={styles.notificationContainer}>
    //     <View style={styles.modal}>
    //         <View style={styles.warning_img_bg}>
    //         {
    //             scannedColor === 'yellow' ? 
    //             <Image style={styles.warning_img} source={require('../assets/yellow.png')}/>:
    //             <Image style={styles.warning_img} source={require('../assets/red.png')}/>

    //         }
    //         </View>
    //         <Text style={styles.plate_Number_Label}>Detected Plate number:</Text> 
    //         <Text style={styles.plate_Number}>{scannedDetectedPN}</Text> 
    //         <Text style={styles.crime_Label}>Closest Match:</Text> 
    //         <Text style={styles.crime}>{scannedPlateNotification}</Text> 
    //         <Text style={styles.crime_Label}>Criminal Offense:</Text> 
    //         <Text style={styles.crime}>{scannedCrimeNotification}</Text> 
    //         <Text style={styles.location_Label}>Location:</Text> 
    //         <Text style={styles.location}>{scannedCurLocNotification}</Text>
    //         <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
    //             <MaterialCommunityIcons name="close" size={45} />
    //         </Pressable>
    //     </View>
    }
        {/* <View style={styles.modal}>
            <Image source={require('../assets/notifications.png')}/>
            <Image style={styles.warning_img} source={require('../assets/yellow.png')}/>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{scannedPlateNotification}</Text> 
            <Text style={styles.crime_Label}>Criminal Offense:</Text> 
            <Text style={styles.crime}>{scannedCrimeNotification}</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            <Text style={styles.location}>{scannedCurLocNotification}</Text>
            <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                <MaterialCommunityIcons name="close" size={45} />
            </Pressable>
        </View>


        {scannedPlateNumberList.map((item)=>{
            //setCurPlateNumber(item);
            return(
                <View style={styles.modal}>
                    <Image source={require('../assets/notifications.png')}/>
                    <Text style={styles.plate_Number_Label}>Plate number:</Text> 
                    <Text style={styles.plate_Number}>{item}</Text> 
                    <Text style={styles.crime_Label}>Criminal Offense:</Text> 
                    <Text style={styles.crime}>{scannedCrimeList[scannedCrimeList.length -1]}</Text> 
                    <Text style={styles.location_Label}>Location:</Text> 
                    <Text style={styles.location}>{curLocList[curLocList.length - 1]}</Text> 

                    <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                        <MaterialCommunityIcons name="close" size={45} />
                    </Pressable>
                </View>
            )
        })} */}
        
    </View>
  )
}

const styles = StyleSheet.create({
    notificationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },

    modal:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: 332,
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 20,
        position: 'absolute',
        margin: 'auto',
        overflow: 'hidden',
        // marginTop: 1000,
    },

    plate_Number_Label:{
        fontSize: 16,
        color: '#9F9F9F',
        marginTop: -24
    },

    plate_Number:{
        fontSize: 28,
        fontWeight: '900',
        color: '#252727',
        marginBottom: 10,
        
    },

    crime_Label:{
        fontSize: 16,
        color: '#9F9F9F',
        marginBottom: 10,
    },

    crime:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
        marginBottom: 10,
    },

    location_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    location:{
        fontSize: 28,
        fontWeight: '900',
        color: '#252727',
        marginBottom: 20,
        marginBottom: 10,
    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    okBtnBg:{
        height: 45,
        width: 45,
        borderRadius: 100,
        opacity: 0.4,
        position: 'absolute',
        backgroundColor: '#000000',
    },

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

    warning_img_bg:{
        marginTop: "-20%" ,
        marginBottom: 10,
        backgroundColor: 'white',
        height: 130,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,

    },

    img_bg:{
        width: '100%',
        height: 140,
        position: 'absolute',
        top: 0,
        backgroundColor: 'red'
    },

    warning_img:{
        height: '100%',
        width: '100%',
        // height: 170,
        // width: 332,
        
    },

    img_bg_cover:{
        width: '100%',
        position: 'relative',
        height: 140,
        marginTop: -20
    },



    Display_archive_table_matches_dashboard_container: {
        borderWidth: 0.5,
        borderRadius: 12,
        overflow: 'hidden',
        height: 290,
        
        width: '80%'
      },
    
    box_container: {
        height: '100%',
    },
    
    confidenceLevel_yellow:{
        backgroundColor: '#FFC048',
        padding: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        width: '90%'
    },

    confidenceLevel_red:{
        backgroundColor: '#FF546C',
        padding: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        width: '90%'
    },

    confidenceLevelText:{
        color:'white',
        
    }

})

export default Notification