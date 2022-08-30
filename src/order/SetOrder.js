import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../../Constants';
import ImagePicker from 'react-native-image-crop-picker';

import * as orderService from '../../services/order.service';

const SetOrder = ({navigation, route}) => {
  const {data, total} = route.params;
  const [image, setImage] = useState(null);

  const [address, setAddress] = useState('');

  openPhotoGallery = async cropIt => {
    let image = await ImagePicker.openPicker({
      // width: 300, // width after cropped
      // height: 300, // height after cropped
      cropping: cropIt,
      compressImageMaxWidth: 640, // max width compress if not croppred
      compressImageMaxHeight: 480, // max height compress if not croppred
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    });

    setImage({
      uri: image.path,
      width: image.width,
      height: image.height,
      mime: image.mime,
    });
  };

  const uploadWithAxios = async () => {
    const data = new FormData();
    data.append('username', 'codemobiles'); // you can append anyone.
    data.append('password', '1234'); // you can append anyone.
    data.append('userfile', {
      uri: image.uri,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg',
    });

    let result = await axios.post('http://192.168.3.17:3000/uploads', data);
    console.log(JSON.stringify(result.data));
    Alert.alert(JSON.stringify(result.data));
  };

  const onCraeteOrder = async () => {
    var response = await orderService.CreateOrder({
      total,
      data,
      address,
    });
    if (response.statusCode == 200) navigation.navigate('Home');
    else alert("กรุณากรอกที่อยู่");
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
        <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
          check out
        </Text>

        <Text style={{fontSize: 38, color: COLORS.black, fontWeight: 'bold'}}>
          Products In Basket
        </Text>
        {data.map((item, i) => (
          <View
            key={i}
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#fff',
              width: '90%',
              padding: 10,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginTop: 20,
            }}>
            <Image
              source={{
                uri: item.productImage,
              }}
              style={{width: 125, height: 125}}></Image>
            <View>
              <Text style={{padding: 5, fontSize: 25}}>{item.productName}</Text>
              <Text style={{padding: 5}}>ราคา {item.productPrice} บาท</Text>
              <Text style={{padding: 5}}>จำนวน {item.amount} ชิ้น</Text>
              <Text style={{padding: 5}}>
                ราคารวม {item.sumAmountPrice} บาท
              </Text>
            </View>
          </View>
        ))}
        <Text></Text>
        <Text style={{fontSize: 38, color: COLORS.black, fontWeight: 'bold'}}>
          total : {total} ฿
        </Text>
        <Text></Text>

        <Text style={{fontSize: 38, color: COLORS.black, fontWeight: 'bold'}}>
          Address
        </Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={e => setAddress(e)}
        />

        {/* <TouchableOpacity onPress={()=>navigation.navigate('Payment')}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#FFA500',
              width: '90%',
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 20}}>Payment</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={onCraeteOrder}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#FFA500',
              width: '90%',
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 20}}>pay</Text>
          </View>
        </TouchableOpacity>

        <Text></Text>
        <Text></Text>
        <Text></Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#BEBEBE',
    width: '100%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
});

export default SetOrder;
