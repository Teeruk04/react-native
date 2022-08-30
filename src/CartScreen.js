import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../Constants';
import * as addcart from '../services/addcart';

const CartScreen = ({navigation}) => {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    GetCartItem();
  }, []);

  const Delete = async id => {
    var response = await addcart.Delete(id);
    alert('ย้ายสินค้าออกจากตะกร้าเเล้ว');
    if (response.statusCode == 200) GetCartItem();
    else console.log(response.message);
  };

  const GetCartItem = async navigation => {
    var json = await AsyncStorage.getItem('user');
    const {userId} = JSON.parse(json);
    var response = await addcart.GetByUserId(userId);
    if (response.statusCode == 200) {
      setTotal(response.total);
      setData(response.data);
    } else console.log(response.message);
    console.log(JSON.stringify(response.data, null, 2));
  };

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <ScrollView>
        <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
          Cart
        </Text>
        {data &&
          data.map((item, index) => {
            return (
              <View
                key={index}
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
                  source={{uri: item.productImage}}
                  style={{width: 100, height: 100}}></Image>
                <View>
                  <Text style={{padding: 5}}>{item.productName}</Text>
                  <Text style={{padding: 5}}>ราคา {item.productPrice} บาท</Text>
                  <Text style={{padding: 5}}>จำนวน {item.amount} ชิ้น</Text>
                  <Text style={{padding: 5}}>
                    ราคารวม {item.amount * item.productPrice} บาท
                  </Text>
                </View>
                <Button
                  style={{alignSelf: 'center'}}
                  title="Delete"
                  color="#FF3300"
                  onPress={() => Delete(item.id)}
                />
              </View>
            );
          })}
        <TouchableOpacity
          onPress={() => navigation.navigate('SetOrder', {data, total})}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#FFCC00',
              width: '90%',
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 20}}>Buy</Text>
          </View>
        </TouchableOpacity>

        <Text></Text>
        <Text></Text>

        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
