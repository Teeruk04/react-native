import React,{useState,} from 'react';
import {SafeAreaView,Text,Image,TouchableOpacity,StyleSheet,View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import *as paymentService from '../services/payment.service'


export default function PaymentScreen({route,navigation}) {

  const {id} = route.params;
  const [image, setimage] = useState(null);

  const createPayment = async ()=>{
    console.log(id)
    var response = await paymentService.CraetePayment(id,image);
    console.log(response);
    alert("เสร็จสิ้น")
    navigation.navigate('Order');

  }

  const openPhotoGallery =async  (cropIt) =>{
    let image = await ImagePicker.openPicker({
      cropping: cropIt,
      compressImageMaxWidth:640,
      compressImageMaxHeight:180,
      compressImageQuality:0.5,
      compressVideoPreset:'MediumQuality',
      includeExif:true,
    });
    setimage({
      uri: image.path,
      width: image.width,
      height: image.height,
      mime: image.mime
    })
  }


  return (
    <ScrollView>
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
        <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
          วิธีการชำระเงิน
        </Text>
        <Text style={{fontSize: 18, color: COLORS.dark, fontWeight: 'bold'}}>
        ชำระเงินผ่านการโอนเข้าธนาคารบริษัท
        </Text>
        <Text></Text>
        <Text style={{fontSize: 30, color: COLORS.green, fontWeight: 'bold'}}>
          บัญชีธนาคาร
        </Text>
        <Text></Text>
        <Text style={{fontSize: 25, color: COLORS.green, fontWeight: 'bold'}}>
          ธนาคารกรุงไทย
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
          ชื่อบัญชี บริษัท SilverPony จำกัด
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
          เลขบัญชี 1122542232
        </Text>
        <Text></Text>
        <Text style={{fontSize: 25, color: COLORS.green, fontWeight: 'bold'}}>
          ธนาคารออมสิน
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
          ชื่อบัญชี บริษัท SilverPony จำกัด
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
          เลขบัญชี 1122542232
        </Text>
        <Text></Text>
        <View>
        <TouchableOpacity
        onPress={()=>openPhotoGallery(true)}
          style={styles.button}>
          
          <Text style={styles.text}>GALLERY</Text>

        </TouchableOpacity>
        </View>
        <Text></Text>
        {image && 
        <>
        <Image
        source={image}
        style={{flex:1,width:"100%",marginBottom: 20}}
        resizeMode="contain"
        />

        <TouchableOpacity
        onPress={()=>(createPayment())}
        style={styles.button}>
          <Text style={styles.text}>UPLOAD</Text>

        </TouchableOpacity>

        
        </>}
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
        </Text>
        <Text style={{fontSize: 22, color: COLORS.dark, fontWeight: 'bold'}}>
          
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  upload_button:{
    flex:1,
    width:"100%",
    marginBottom: 20
  },
  button: {
    marginBottom: 10,
    height: 40,
    padding: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FF9900',
  },
  text: {
    color: '#000000',
    fontWeight: 'normal',
  },
})

 
